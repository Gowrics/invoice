import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormContext } from "./FormContext";

const InvoiceUpdate = () => {
  const { updateId, setUpdateId } = useContext(FormContext);

  const [invoice, setInvoice] = useState(null); // To store fetched invoice details
  const [isEditing, setIsEditing] = useState(false); // Flag to toggle edit mode
  const navigate = useNavigate();

  const handleInvoiceSearch = async () => {
    if (!updateId) {
      alert("Please enter an Invoice ID.");
      return;
    }

    try {
      // Assuming you have a route to get invoice by invoiceId
      const response = await axios.get(`http://localhost:8004/invoiceData`);

      // Find the invoice by invoiceId
      const invoiceData = response.data.find(
        (invoice) => invoice.invoiceId === updateId
      );
      setUpdateId(invoiceData.id);

      if (invoiceData) {
        setInvoice(invoiceData);
        setIsEditing(true); // Allow editing after fetching invoice
      } else {
        alert("Invoice not found.");
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
      alert("Error fetching invoice details.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };
  console.log("inv idddd", updateId);
  const handleUpdateInvoice = async () => {
    try {
      // Send updated invoice data back to the server (JSON or database)
      const response = await axios.put(
        `http://localhost:8004/invoiceData/${updateId}`,
        invoice
      );

      if (response.status === 200) {
        alert("Invoice updated successfully.");
        navigate("/itemform"); // Navigate back to ItemForm or another page
      } else {
        alert("Error updating invoice.");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Error updating invoice.");
    }
  };

  return (
    <div className="invoice-search">
      <h3>Invoice Search</h3>
      <input
        type="text"
        placeholder="Enter Invoice ID"
        value={updateId}
        onChange={(e) => setUpdateId(e.target.value)}
      />
      <button onClick={handleInvoiceSearch}>Search</button>

      {invoice && (
        <div className="invoice-details">
          <h4>Invoice Details</h4>
          <div>
            <label>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={invoice.customerName}
              disabled={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Customer City:</label>
            <input
              type="text"
              name="customerCity"
              value={invoice.customerCity}
              disabled={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Total Amount:</label>
            <input
              type="number"
              name="totalAmount"
              value={invoice.totalAmount}
              disabled={!isEditing}
              onChange={handleInputChange}
            />
          </div>

          {/* Add fields for the items array */}
          {invoice.items.map((item, index) => (
            <div key={index}>
              <h5>Item {index + 1}</h5>
              <div>
                <label>Item Description:</label>
                <input
                  type="text"
                  name="itemDescription"
                  value={item.itemDescription}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedItems = [...invoice.items];
                    updatedItems[index].itemDescription = e.target.value;
                    setInvoice({ ...invoice, items: updatedItems });
                  }}
                />
              </div>
              <div>
                <label>Item Rate:</label>
                <input
                  type="number"
                  name="itemRate"
                  value={item.itemRate}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedItems = [...invoice.items];
                    updatedItems[index].itemRate = e.target.value;
                    setInvoice({ ...invoice, items: updatedItems });
                  }}
                />
              </div>
              <div>
                <label>Item Quantity:</label>
                <input
                  type="number"
                  name="itemQuantity"
                  value={item.itemQuantity}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const updatedItems = [...invoice.items];
                    updatedItems[index].itemQuantity = e.target.value;
                    setInvoice({ ...invoice, items: updatedItems });
                  }}
                />
              </div>
            </div>
          ))}

          {isEditing && (
            <button onClick={handleUpdateInvoice}>Update Invoice</button>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceUpdate;
