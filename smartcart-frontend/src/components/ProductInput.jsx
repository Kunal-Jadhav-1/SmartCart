import React, { useState } from "react";

// Helper to detect site type
const detectSite = (url) => {
  if (url.includes("amazon")) return "amazon";
  if (url.includes("flipkart")) return "flipkart";
  if (url.includes("myntra")) return "myntra";
  return null;
};

const fetchProductDetails = async (url, site) => {
  const response = await fetch(`http://127.0.0.1:8000/tracker/${site}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) throw new Error("Failed to fetch product details.");
  return await response.json();
};

const ProductInput = ({ addTrackedProduct }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productPreview, setProductPreview] = useState(null);
  const [targetPrice, setTargetPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const site = detectSite(url);
    if (!site) {
      setError("Unsupported URL. Use Amazon, Flipkart or Myntra.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchProductDetails(url, site);
      setProductPreview({
        name: data.product_name,
        price: data.price,
        image: data.image,
        url,
        site: site.charAt(0).toUpperCase() + site.slice(1),
      });
      setUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackProduct = async () => {
    if (!targetPrice || isNaN(targetPrice)) {
      setError("Please enter a valid target price.");
      return;
    }

    const payload = {
      user_email: "jskunal.01@gmail.com",
      product_name: productPreview.name,
      price: productPreview.price,
      image: productPreview.image,
      url: productPreview.url,
      site: productPreview.site,
      target_price: parseFloat(targetPrice),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/tracker/track-product/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to track product.");

      const trackedData = await res.json();

      addTrackedProduct({
        ...payload,
        product_id: trackedData.product_id,
        user_id: trackedData.user_id,
      });

      setProductPreview(null);
      setTargetPrice("");
      alert("Product tracked successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste product URL here..."
          className="flex-1 px-4 py-2 border rounded-md shadow-sm text-secondary"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-secondary text-primary rounded-md hover:bg-ascent hover:text-primary transition"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Preview"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Modal */}
      {productPreview && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50">
          <div className="bg-secondary text-primary rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-2">{productPreview.name}</h2>
            <img
              src={productPreview.image}
              alt={productPreview.name}
              className="w-40 h-40 object-contain mx-auto my-4"
            />
            <p className="text-lg text-primary text-center mb-2">
              ₹{productPreview.price}
            </p>

            <input
              type="number"
              placeholder="Enter target price"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setProductPreview(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleTrackProduct}
                className="px-4 py-2 bg-primary text-secondary rounded-md hover:bg-ascent hover:text-primary"
              >
                Track Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInput;
