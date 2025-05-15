import React, { useState } from "react";
import PriceHistoryModal from "./PriceHistoryModal";

const TrackedProductModal = ({ product, onClose }) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="bg-secondary text-primary rounded-lg p-6 w-[90%] max-w-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-center">{product.product_name}</h2>
          <img
            src={product.image}
            alt={product.product_name}
            className="w-48 h-48 object-contain mx-auto border border-primary rounded"
          />
          <p className="text-center text-lg">Price: ₹{product.price}</p>
          <p className="text-center text-md">Target Price: ₹{product.target_price}</p>
          <p className="text-center text-sm text-muted">Platform: {product.site}</p>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setShowHistory(true)}
              className="px-4 py-2 bg-primary text-secondary rounded-md hover:bg-ascent"
            >
              View Price History
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {showHistory && (
        <PriceHistoryModal
          product={{ id: product.product_id, product_name: product.product_name }}
          onClose={() => setShowHistory(false)}
        />
      )}
    </>
  );
};

export default TrackedProductModal;
