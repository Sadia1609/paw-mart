import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);

  // Fetch orders from backend
  useEffect(() => {
    axios
      .get(`https://paw-mart-two.vercel.app/orders/${user?.email}`)
      .then((res) => setMyOrders(res.data))
      .catch((err) => console.log(err));
  }, [user?.email]);

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
