import React, { useContext } from "react";
import { FormContext } from "./FormContext";
import "./style.css";
import ItemList from "./ItemList";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ItemForm = () => {
  const {
    form,
    invoice,
    handleChange,
    totalAmount,
    invoiceData,
    handleAddItem,
  } = useContext(FormContext);

  const navigate = useNavigate(); // Initialize the navigate function

  // Handle form submission
  // const handleSubmit = () => {
  //   const lastInvoice =
  //     invoiceData.length > 0 ? invoiceData[invoiceData.length - 1] : {};

  //   // Ensure default values if fields are missing
  //   const currentTotalAmount = parseFloat(lastInvoice.totalAmount) || 0;
  //   const currentDisAmount = parseFloat(lastInvoice.totalDiscount) || 0;
  //   const currentNetAmount = parseFloat(lastInvoice.totalNetAmount) || 0;

  //   // Calculate the new total amounts
  //   const newTotalAmount = currentTotalAmount + form.itemNetAmount;
  //   const newDisAmount = currentDisAmount + form.itemDiscount;
  //   const newNetAmount = currentNetAmount + form.itemNetAmount;

  //   const newUser = {
  //     ...invoiceData,
  //     totalAmount: newTotalAmount,
  //     totalDiscount: newDisAmount,
  //     totalNetAmount: newNetAmount,
  //     // totalCashAmount: newCashAmount.toFixed(2),
  //     // totalCardAmount: newCardAmount.toFixed(2),
  //     // totalCredid: newCreditAmount.toFixed(2),
  //   };
  //   console.log("New Total Amount:", invoiceData);
  //   // Send updated data to backend
  //   axios
  //     .post("http://localhost:8004/invoiceData", invoiceData)
  //     .then(() => {
  //       console.log("Invoice updated successfully", invoiceData);
  //     })
  //     .catch((error) => console.error("Error updating invoice:", error));
  // };

  return (
    <div className="invoice">
      {/* Header Section */}
      <div className="headersec">
        <div className="head">
          <h1>Logo Consulting Pvt Ltd</h1>
        </div>
        <hr />
        <div className="header-details">
          <h4>Date: {new Date().toLocaleDateString()}</h4>
        </div>
        <div className="details">
          <div>
            <h6>Total Amount: {invoiceData[0]?.totalAmount || "0.00"}</h6>
            <h6>Total Discount: {invoiceData[0]?.totalDiscount || "0.00"}</h6>
            <h6>
              Total Net Amount: {invoiceData[0]?.totalNetAmount || "0.00"}
            </h6>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="invoiceform">
        <form className="mx-1 mx-md-4">
          <div className="row">
            <div className="col m-2">
              <input
                type="text"
                className="form-control"
                placeholder="Item Description"
                name="itemDescription"
                value={form.itemDescription}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Item Rate"
                name="itemRate"
                value={form.itemRate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Item Quantity"
                name="itemQuantity"
                value={form.itemQuantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Item Discount Amount"
                name="itemDiscount"
                value={form.itemDiscount}
                disabled
              />
            </div>
            <div className="col m-2">
              <input
                type="number"
                className="form-control"
                placeholder="Item Net Amount"
                name="itemNetAmount"
                value={form.itemNetAmount}
                disabled
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={handleAddItem}
              className="btn m-1 btn-primary"
            >
              Add Item
            </button>
            <Link to="/payment" className="btn btn-primary">
              Payment
            </Link>

            {/* <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Paymentsuh
            </button> */}
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <ItemList />
      </div>
    </div>
  );
};

export default ItemForm;
