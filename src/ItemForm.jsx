import React, { useContext } from "react";
import { FormContext } from "./FormContext";
import "./style.css";
import ItemList from "./ItemList";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import InvoiceDisplay from "./ItemSearch";

const ItemForm = () => {
  const {
    form,
    handleChange,
    handleDeleteInvoice,
    invoiceData,
    handleAddItem,
  } = useContext(FormContext);

  const navigate = useNavigate(); // Initialize the navigate function
  const onCheck = () => {
    if (invoiceData[0].items.length === 0) {
      alert("Please adding an item.");
      return;
    }
    navigate("/payment");
  };

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
            <h6>
              Total Amount: {Math.round(invoiceData[0]?.totalAmount || 0)}
            </h6>
            <h6>
              Total Discount: {Math.round(invoiceData[0]?.totalDiscount || 0)}
            </h6>
            <h6>
              Total Net Amount:{" "}
              {Math.round(invoiceData[0]?.totalNetAmount || 0)}
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
            {/* <Link to="/payment" className="btn btn-primary">
              Payment
            </Link> */}
            <button type="button" className="btn btn-primary" onClick={onCheck}>
              Payment
            </button>

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
        <Link to="/invoiceupdate" className="btn btn-primary me-2">
          Invoice Search
        </Link>
        <Link to="/invoicedelete" className="btn btn-primary me-2">
          Invoice Delete
        </Link>
      </div>
    </div>
  );
};

export default ItemForm;
