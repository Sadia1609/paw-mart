import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // // Fetch orders from backend
  // useEffect(() => {
  //   axios
  //     .get(`https://paw-mart-two.vercel.app/orders/${user?.email}`)
  //     .then((res) => setMyOrders(res.data))
  //     .catch((err) => console.log(err));
  // }, [user?.email]);

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch orders from backend
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Method 1: Using axios
    axios
      .get(`${API_BASE_URL}/orders/${user.email}`)
      .then((res) => {
        console.log("Orders data:", res.data);
        setMyOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
        setLoading(false);
      });
  }, [user?.email, API_BASE_URL]);

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("My Orders Report", 14, 22);

    const tableColumn = [
      "No",
      "Product Name",
      "Price",
      "Phone",
      "Location",
      "Quantity",
      "Date",
    ];
    const tableRows = myOrders.map((order, index) => [
      index + 1,
      order.productName,
      order.price,
      order.phone,
      order.address,
      order.quantity,
      new Date(order.date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save("my_orders_report.pdf");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-error text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold mb-2">Error Loading Orders</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-5">
      <title>My Orders</title>
      <div className="flex justify-end mb-4">
        <button className="btn btn-primary btn-sm" onClick={exportPDF}>
          Export as PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{order.productName}</td>
                <td>{order.price}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{order.quantity}</td>
                <td>
                  {new Date(order.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
