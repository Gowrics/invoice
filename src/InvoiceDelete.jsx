import React, { useContext, useState } from "react";
import axios from "axios";
import { FormContext } from "./FormContext";
import { useNavigate } from "react-router-dom";

const InvoiceDelete = () => {
  const { updateId, setUpdateId, invoice } = useContext(FormContext);
  const navigate = useNavigate();

  const handleDeleteInvoice = () => {
    if (!updateId) {
      alert("Please enter an Invoice ID.");
      return;
    }

    // // Find the invoice by invoiceId
    // const invoiceData = invoice.find((invoice) => invoice.id === updateId);

    // // Check if invoiceData exists
    // if (!invoiceData) {
    //   alert("Invoice not found.");
    //   return;
    // }

    // console.log("Invoice Data found: ", invoiceData);

    // // Perform the delete request with the correct invoice ID
    // console.log("Invoice Data found: ", updateId);
    axios
      // .delete(` http://localhost:5000/invoices/${updateId}`) // Use invoiceData.id here

      .delete(`http://192.168.91.201:8082/invoice/delete/${updateId}`) // Use invoiceData.id here
      .then((res) => {
        // Assuming the server returns the updated invoice data after deletion
        alert("Invoice deleted successfully:", res.data);
        navigate("/itemsearch");
        // Optionally update the state here if needed
      })
      .catch((err) => {
        console.error("Error deleting invoice:", err);
        alert("Failed to delete invoice.");
      });
  };

  return (
    <div>
      <h3>Delete Invoice</h3>

      {/* Input field to enter the invoice ID */}
      <input
        type="text"
        placeholder="Enter Invoice ID"
        value={updateId}
        onChange={(e) => setUpdateId(e.target.value)} // Set updateId on input change
      />

      {/* Button to trigger the delete operation */}
      <button onClick={handleDeleteInvoice} className="btn btn-primary">
        Delete Invoice
      </button>
    </div>
  );
};

export default InvoiceDelete;
