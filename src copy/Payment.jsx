import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";
import "./style.css";
import ItemList from "./ItemList";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { invoiceData, setInvoiceData, form, invoice, handleChange } =
    useContext(FormContext);

  const [totalCashAmount, setTotalCashAmount] = useState(0);
  const [totalCardAmount, setTotalCardAmount] = useState(0);
  const [totalCreditAmount, setTotalCreditAmount] = useState(0);
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle form submission

  const handleSubmit = () => {
    const lastInvoice =
      invoiceData.length > 0 ? invoiceData[invoiceData.length - 1] : {};

    // Ensure default values if fields are missing
    const currentTotalAmount = parseInt(lastInvoice.totalAmount) || 0;
    const currentDisAmount = parseFloat(lastInvoice.totalDiscount) || 0;
    const currentNetAmount = parseFloat(lastInvoice.totalNetAmount) || 0;

    // Ensure customer details
    const newCustmerName = lastInvoice.customerName || "";
    const newCustmerCity = lastInvoice.customerCity || "";
    const newCustmerPhnum = lastInvoice.customerPhNum || "";

    // Use `form` values to update amounts
    const formItemNetAmount = parseFloat(form.itemNetAmount) || 0;
    const formItemDiscount = parseFloat(form.itemDiscount) || 0;

    const newTotalAmount = currentTotalAmount + formItemNetAmount;
    const newDisAmount = currentDisAmount + formItemDiscount;
    const newNetAmount = currentNetAmount + formItemNetAmount;

    // Sum of Cash, Card, and Credit Amount
    const cashAmount = parseFloat(lastInvoice.cashAmount) || 0;
    const cardAmount = parseFloat(lastInvoice.cardAmount) || 0;
    const creditAmount = parseFloat(lastInvoice.creditAmount) || 0;

    const totalPayment = cashAmount + cardAmount + creditAmount;

    console.log("Total Payment:", totalPayment);
    console.log("New Total Amount:", newTotalAmount);
    // Ensure the invoice array has at least one item
    if (invoice.length > 0) {
      const fromInvoice = invoice[invoice.length - 1];
      setTotalCashAmount(parseFloat(fromInvoice.totalCashAmount) || 0);
      setTotalCardAmount(parseFloat(fromInvoice.totalCardAmount) || 0);
      setTotalCreditAmount(parseFloat(fromInvoice.totalCreditAmount) || 0);
    } else {
      console.log("No invoices available.");
      // You can set default values or handle the empty invoice case here if needed
      setTotalCashAmount(0);
      setTotalCardAmount(0);
      setTotalCreditAmount(0);
    }

    const newTotalCashAmount = totalCashAmount + cashAmount;
    const newTotalCardAmount = totalCardAmount + cardAmount;
    const newTotalCreditAmount = totalCreditAmount + creditAmount;

    // Use a tolerance to compare floating-point numbers
    const tolerance = 0.01; // Define a small acceptable error margin
    if (totalPayment > newTotalAmount) {
      alert(`Balance: ${totalPayment - newTotalAmount}`);
    }

    if (Math.abs(totalPayment - newTotalAmount) < tolerance) {
      const updatedInvoice = {
        ...lastInvoice,
        totalAmount: newTotalAmount.toFixed(2), // Format to 2 decimal places
        totalDiscount: newDisAmount.toFixed(2),
        totalNetAmount: newNetAmount.toFixed(2),
        cashAmount: cashAmount.toFixed(2),
        cardAmount: cardAmount.toFixed(2),
        creditAmount: creditAmount.toFixed(2),
        customerName: newCustmerName,
        customerCity: newCustmerCity,
        customerPhNum: newCustmerPhnum,
        totalCashAmount: newTotalCashAmount,
        totalCardAmount: newTotalCardAmount,
        totalCreditAmount: newTotalCreditAmount,
      };

      console.log("Updated Invoice:", updatedInvoice);
      console.log("totalCashAmount ", updatedInvoice.totalCashAmount);

      // Send updated data to backend
      axios
        .post("http://localhost:8004/invoiceData", updatedInvoice)
        .then(() => {
          console.log("Invoice updated successfully", updatedInvoice);
          navigate("/billsummary");
        })
        .catch((error) => console.error("Error updating invoice:", error));
    } else {
      alert(
        `Total payment (${totalPayment.toFixed(
          2
        )}) does not match the total amount (${newTotalAmount.toFixed(
          2
        )}). Please adjust the amounts.`
      );
    }
  };

  return (
    <div>
      <div className="invoice">
        <div className="headersec">
          <div className="head">
            <h1>Logo Consulting Pvt Ltd</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: "70px",
              }}
            >
              <p>Invoice Number: {invoiceData[0]?.invoiceId || "0.00"}</p>{" "}
              <p>Invoice Date: {invoiceData[0]?.ate || "0.00"}</p>
            </div>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "0px 26px",
              justifyContent: "space-between",
            }}
          >
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
            <div>
              <h6>Total Cash Amount: {invoiceData[0]?.cashAmount || "0.00"}</h6>
              <h6>Total Card Amount: {invoiceData[0]?.cardAmount || "0.00"}</h6>
              <h6>
                Total Credit Amount: {invoiceData[0]?.creditAmount || "0.00"}
              </h6>
            </div>
          </div>
        </div>
        <div className="invoiceform"></div>
        <div className="table-responsive">
          <ItemList />
          <form className="mx-1 mx-md-4">
            <div className="row">
              <div className="col m-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Cash Amount"
                  name="cashAmount"
                  value={invoiceData[0].cashAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col m-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Card Amount"
                  name="cardAmount"
                  value={invoiceData[0].cardAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col m-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Credit Amount"
                  name="creditAmount"
                  value={invoiceData[0].creditAmount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* ---------------------------- */}
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Customer Name"
                  name="customerName"
                  value={invoiceData[0]?.customerName || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Customer City"
                  name="customerCity"
                  value={invoiceData[0].customerCity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Customer Ph Number"
                  name="customerPhNum"
                  value={invoiceData[0].customerPhNum}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="btn-group">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn m-1 btn-primary"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
