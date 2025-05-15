import { useState } from "react";
import TrackedProductModal from "./TrackedProductModal";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-secondary rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer 
                   transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-ascent"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-48 object-contain rounded-lg border border-ascent"
        />
        <h3 className="mt-4 text-lg font-semibold text-primary">{product.name}</h3>
        <p className="mt-4 text-lg font-bold text-primary">Price: ₹{product.price}</p>
      </div>

      {showModal && (
        <TrackedProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default ProductCard;
