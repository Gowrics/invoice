import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";

import "./style.css";
import { Link } from "react-router-dom";

const InvoiceDisplay = () => {
  const { invoice, setUpdateId } = useContext(FormContext);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Filter invoices based on fromDate and toDate
  const filteredInvoices =
    fromDate && toDate
      ? invoice.filter((inv) => {
          const invoiceDate = new Date(inv.invoiceHeader.date); // Parse invoice date
          const from = new Date(fromDate);
          const to = new Date(toDate);

          // Validate the date range
          if (from > to) {
            console.error("Invalid date range: fromDate is after toDate");
            return false; // Skip filtering for invalid range
          }

          // Compare the year, month, and day inclusively
          return invoiceDate >= from && invoiceDate <= to;
        })
      : invoice;

  // If no invoices match the date range, show the message

  return (
    <>
      <div className="invoice" style={{ border: "0" }}>
        {/* Header Section */}
        <div className="headersec">
          <div className="head">
            <h1>Logo Consulting Pvt Ltd</h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "29px",
            }}
          >
            <div>
              <label>Search By Date</label>
              <input
                type="date"
                placeholder="From"
                name="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)} // Update the fromDate state
              />
            </div>

            <input
              type="date"
              placeholder="To"
              name="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)} // Update the toDate state
            />
          </div>

          <div>
            {filteredInvoices.map((inv) => (
              <div key={inv.id}>
                <h4>Invoice</h4>
                <div className="details">
                  <div>
                    <p>Invoice ID: {inv.invoiceHeader.invoiceNo}</p>
                    <p>
                      Invoice Date:{" "}
                      {new Date(inv.invoiceHeader.date).toLocaleDateString(
                        "en-CA"
                      )}
                    </p>
                  </div>

                  <div>
                    <p>Cash Amount: {inv.invoiceHeader.cashAmount || 0}</p>
                    <p>Card Discount: {inv.invoiceHeader.cardDiscount || 0}</p>
                    <p>Credit Amount: {inv.invoiceHeader.creditAmount || 0}</p>
                  </div>
                </div>
                <h3>Items:</h3>
                <div className="table-responsive">
                  <table className="table mt-0 border table-striped">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Net Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inv.invoiceDetails && inv.invoiceDetails.length > 0 ? (
                        inv.invoiceDetails.map((item, itemIndex) => (
                          <tr key={itemIndex}>
                            <td>{item.itemdescription}</td>
                            <td>{item.itemRate}</td>
                            <td>{item.itemQty}</td>
                            <td>{item.itemDiscount}</td>
                            <td>{item.netAmount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">No items available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <Link
                  to="/invoiceupdate"
                  className="btn btn-primary btn-sm me-5"
                  onClick={() => setUpdateId(inv.invoiceHeader.invoiceNo)}
                >
                  Update
                </Link>
                <Link
                  to="/invoicedelete"
                  className="btn btn-sm btn-primary "
                  onClick={() => setUpdateId(inv.invoiceHeader.invoiceNo)}
                >
                  Delete
                </Link>
                <hr style={{ color: "red" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDisplay;
