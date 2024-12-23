import React, { useContext, useState } from "react";
import { FormContext } from "./FormContext";

const InvoiceDisplay = () => {
  const { invoice } = useContext(FormContext);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Filter invoices based on fromDate and toDate
  const filteredInvoices =
    fromDate && toDate
      ? invoice.filter((inv) => {
          const invoiceDate = new Date(inv.invoiceDate);
          console.log("Invoice Date:", invoiceDate); // Log invoice date
          console.log("From Date:", fromDate, "To Date:", toDate); // Log fromDate and toDate

          // Compare invoiceDate to the fromDate and toDate range (inclusive)
          return (
            invoiceDate >= new Date(fromDate) && invoiceDate <= new Date(toDate)
          );
        })
      : invoice;

  // If no invoices match the date range, show the message
  if (filteredInvoices.length === 0) {
    return <p>No invoice data available for the selected date range.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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

        <input
          type="date"
          placeholder="To"
          name="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)} // Update the toDate state
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {filteredInvoices.map((inv) => (
          <div key={inv.invoiceId} style={{ marginBottom: "20px" }}>
            <h2>Invoice ID: {inv.invoiceId}</h2>
            <p>Invoice Date: {inv.invoiceDate}</p>
            <p>Total Amount: {inv.totalAmount}</p>
            <p>Total Discount: {inv.totalDiscount}</p>
            <p>Total Net Amount: {inv.totalNetAmount}</p>

            <h3>Items:</h3>
            <table>
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
                {inv.items && inv.items.length > 0 ? (
                  inv.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.itemDescription}</td>
                      <td>{item.itemRate}</td>
                      <td>{item.itemQuantity}</td>
                      <td>{item.itemDiscount}</td>
                      <td>{item.itemNetAmount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No items available</td>
                  </tr>
                )}
              </tbody>
            </table>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceDisplay;
