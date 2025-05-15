import React, { useState, useEffect } from "react";
import ProductInput from "../components/ProductInput";
import ProductCard from "../components/ProductCard";

const TrackProduct = () => {
  const [products, setProducts] = useState([]);

  // Load products on mount
  useEffect(() => {
    const stored = localStorage.getItem("trackedProducts");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProducts(Array.isArray(parsed) ? parsed : []);
      } catch (err) {
        console.error("Failed to parse stored products:", err);
      }
    }
  }, []);

  // Save products on change
  useEffect(() => {
    localStorage.setItem("trackedProducts", JSON.stringify(products));
  }, [products]);

  const addTrackedProduct = (product) => {
    setProducts((prev) => {
      const updated = [...prev, product];
      return updated;
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-secondary">
        Track Your Products
      </h1>
      <ProductInput addTrackedProduct={addTrackedProduct} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard
            key={product.product_id || product.url}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackProduct;
