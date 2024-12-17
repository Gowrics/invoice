import React, { useEffect, useState } from "react";
import axios from "axios";

const AddItemForm = () => {
  const [invoiceData, setInvoiceData] = useState([]); // Holds entire invoiceData
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(""); // Holds the targeted invoiceId

  const [itemForm, setItemForm] = useState({
    itemDescription: "",
    itemRate: "",
    itemQuantity: "",
    itemDiscount: "",
    itemNetAmount: "",
  });

  // Fetch the invoiceData
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    axios
      .get("http://localhost:8004/invoiceData")
      .then((res) => setInvoiceData(res.data.invoiceData))
      .catch((err) => console.error("Error fetching invoices", err));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedForm = { ...itemForm, [name]: value };

    // Calculate Discount and Net Amount
    if (name === "itemRate" || name === "itemQuantity") {
      const itemRate =
        name === "itemRate" ? parseFloat(value) : parseFloat(itemForm.itemRate);
      const itemQuantity =
        name === "itemQuantity"
          ? parseFloat(value)
          : parseFloat(itemForm.itemQuantity);

      const itemDiscount = (itemRate * itemQuantity * 10) / 100; // 10% discount
      const itemNetAmount = itemRate * itemQuantity - itemDiscount;

      updatedForm = {
        ...updatedForm,
        itemDiscount: itemDiscount.toFixed(2),
        itemNetAmount: itemNetAmount.toFixed(2),
      };
    }

    setItemForm(updatedForm);
  };

  // Add new item to a specific invoiceId
  const handleAddItem = (e) => {
    e.preventDefault();

    // Check for a valid invoiceId
    if (!selectedInvoiceId) {
      alert("Please select an invoice to add the item to.");
      return;
    }

    // Update the correct invoice
    const updatedInvoices = invoiceData.map((invoiceEntry) => {
      const updatedInvoiceData = invoiceEntry.invoiceData.map((invoice) => {
        if (invoice.invoiceId === selectedInvoiceId) {
          return {
            ...invoice,
            items: [...invoice.items, itemForm],
          };
        }
        return invoice;
      });
      return { ...invoiceEntry, invoiceData: updatedInvoiceData };
    });

    // Send updated data back to the server
    axios
      .put("http://localhost:8004/invoiceData", {
        invoiceData: updatedInvoices,
      })
      .then(() => {
        alert("Item added successfully!");
        fetchInvoices(); // Refresh the data
        setItemForm({
          itemDescription: "",
          itemRate: "",
          itemQuantity: "",
          itemDiscount: "",
          itemNetAmount: "",
        });
      })
      .catch((err) => console.error("Error updating data", err));
  };

  return (
    <div>
      <h2>Add Item to Invoice</h2>

      {/* Dropdown to Select Invoice */}
      <div>
        <label>Select Invoice: </label>
        <select
          value={selectedInvoiceId}
          onChange={(e) => setSelectedInvoiceId(e.target.value)}
        >
          <option value="">Select Invoice</option>
          {invoiceData.map((entry) =>
            entry.invoiceData.map((invoice) => (
              <option key={invoice.invoiceId} value={invoice.invoiceId}>
                {invoice.invoiceId} - {invoice.invoiceDate}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Form to Add Item */}
      <form onSubmit={handleAddItem}>
        <div>
          <label>Item Description:</label>
          <input
            type="text"
            name="itemDescription"
            value={itemForm.itemDescription}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Item Rate:</label>
          <input
            type="number"
            name="itemRate"
            value={itemForm.itemRate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Item Quantity:</label>
          <input
            type="number"
            name="itemQuantity"
            value={itemForm.itemQuantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Item Discount:</label>
          <input
            type="text"
            name="itemDiscount"
            value={itemForm.itemDiscount}
            readOnly
          />
        </div>

        <div>
          <label>Item Net Amount:</label>
          <input
            type="text"
            name="itemNetAmount"
            value={itemForm.itemNetAmount}
            readOnly
          />
        </div>

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
