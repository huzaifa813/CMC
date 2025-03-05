import { Order } from "@/app/types";
import { useState } from "react";

export function OrderList({ orders }: { orders: Order[] }) {
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});

  const handleInputChange = (index: number, value: string) => {
    setInputs((prev) => ({ ...prev, [index]: value }));
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      console.log("User input:", inputs[index]);
      setInputs((prev) => ({ ...prev, [index]: "" }));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {orders.length === 0 ? (
        <p className="text-gray-400 text-center w-full">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-md transition-all duration-300"
          >
            <h2 className="text-lg font-semibold">{order.type}</h2>
            <p
              className={`mt-2 ${
                order.status === "processing"
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              Status: {order.status}
            </p>
            <p className="text-gray-400">
              Payment Time:{" "}
              {new Date(order.paymentTimestamp * 1000).toLocaleString()}
            </p>

            <input
              type="text"
              value={inputs[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              placeholder="Enter details and press Enter..."
              className="w-full mt-4 p-2 bg-gray-900 text-white border border-gray-600 focus:border-blue-500 focus:outline-none rounded-md"
            />
          </div>
        ))
      )}
    </div>
  );
}
