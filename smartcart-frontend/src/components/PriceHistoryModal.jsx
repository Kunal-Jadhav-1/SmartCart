import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering required components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceHistoryModal = ({ product, onClose }) => {
  const [priceHistory, setPriceHistory] = useState([]);

  // Fetch price history from the backend
  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8000/tracker/price-history/${product.id}`);
        if (response.ok) {
          const data = await response.json();
          setPriceHistory(data); 
        }
      } catch (err) {
        console.error("Error fetching price history:", err);
      }
    };

    fetchPriceHistory();
  }, [product.id]);

  // Prepare data for the line chart
  const chartData = {
    labels: priceHistory.map(entry => new Date(entry.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: "Price History",
        data: priceHistory.map(entry => entry.price),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 z-50">
      <div className="bg-secondary text-primary rounded-lg p-6 w-[90%] max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{product.product_name} - Price History</h2>

        {/* Line chart */}
        <div className="mb-6">
          {priceHistory.length > 0 ? (
            <Line data={chartData} options={{ responsive: true }} />
          ) : (
            <p>Loading price history...</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PriceHistoryModal;
