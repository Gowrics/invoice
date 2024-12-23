import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FormContext } from "./FormContext";

const EditItems = () => {
  const { invoiceData, setInvoiceData } = useContext(FormContext);
  const { index } = useParams(); // Get index from URL parameters
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Ensure index and items are valid
    if (invoiceData?.[0]?.items?.[index]) {
      setSelectedItem({ ...invoiceData[0].items[index] });
    }
  }, [index, invoiceData]);

  if (!selectedItem) {
    return <div>Loading item details or item not found.</div>;
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedInvoiceData = [...invoiceData];

    // Recalculate itemDiscount and itemNetAmount based on the new item details
    const itemRate = parseFloat(selectedItem.itemRate) || 0;
    const itemQuantity = parseFloat(selectedItem.itemQty) || 0;
    const itemDiscount = (itemRate * itemQuantity * 10) / 100;
    const itemNetAmount = itemRate * itemQuantity - itemDiscount;

    updatedInvoiceData[0].items[index] = {
      ...selectedItem,
      itemDiscount: itemDiscount.toFixed(2),
      netAmount: itemNetAmount.toFixed(2),
    };

    // Recalculate totals for invoiceData
    const { totalAmount, totalDiscount, totalNetAmount } =
      updatedInvoiceData[0].items.reduce(
        (totals, item) => {
          totals.totalAmount += parseFloat(item.netAmount) || 0;
          totals.totalDiscount += parseFloat(item.itemDiscount) || 0;
          totals.totalNetAmount += parseFloat(item.netAmount) || 0;
          return totals;
        },
        {
          totalAmount: 0,
          totalDiscount: 0,
          totalNetAmount: 0,
        }
      );

    updatedInvoiceData[0].totalAmount = totalAmount.toFixed(2);
    updatedInvoiceData[0].totalDiscount = totalDiscount.toFixed(2);
    updatedInvoiceData[0].totalNetAmount = totalNetAmount.toFixed(2);

    setInvoiceData(updatedInvoiceData); // Update the invoice data context
    navigate("/"); // Redirect to the item list after update
    console.log("Updated item:", updatedInvoiceData[0].items[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update Item</h1>
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col m-2">
              <input
                type="text"
                className="form-control"
                placeholder="Item Description"
                name="itemdescription"
                value={selectedItem.itemdescription || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Item Rate"
                name="itemRate"
                value={selectedItem.itemRate || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Item Quantity"
                name="itemQty"
                value={selectedItem.itemQty || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Item Discount Amount"
                name="itemDiscount"
                value={selectedItem.itemDiscount || ""}
                disabled
              />
            </div>
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Item Net Amount"
                name="itemNetAmount"
                value={selectedItem.netAmount || ""}
                disabled
              />
            </div>
          </div>
          <button className="btn btn-success mt-3">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditItems;
