import React, { useState } from "react";
import axios from "axios";
import "./style.css";

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceHeader: {
      date: new Date().toLocaleDateString(), // auto generate today's date
      cashAmount: 0,
      cardAmount: 0,
      creditAmount: 0,
    },
    invoiceDetails: [
      {
        date: new Date().toLocaleDateString(),
        itemdescription: "",
        itemRate: 0,
        itemQty: 0,
        itemDiscount: 0.0,
        netAmount: 0.0,
      },
    ],
  });

  // Handle input changes for invoice header and details
  const handleInvoiceHeaderChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevState) => ({
      ...prevState,
      invoiceHeader: {
        ...prevState.invoiceHeader,
        [name]: value,
      },
    }));
  };

  const handleInvoiceDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInvoiceDetails = [...invoiceData.invoiceDetails];
    updatedInvoiceDetails[index] = {
      ...updatedInvoiceDetails[index],
      [name]: value,
    };

    // Calculate itemDiscount and netAmount automatically
    if (name === "itemRate" || name === "itemQty") {
      updatedInvoiceDetails[index].itemDiscount =
        (updatedInvoiceDetails[index].itemRate *
          updatedInvoiceDetails[index].itemQty *
          10) /
        100;
      updatedInvoiceDetails[index].netAmount =
        updatedInvoiceDetails[index].itemRate *
          updatedInvoiceDetails[index].itemQty -
        updatedInvoiceDetails[index].itemDiscount;
    }

    setInvoiceData({
      ...invoiceData,
      invoiceDetails: updatedInvoiceDetails,
    });
  };

  // Add more invoice details (items)
  const addItem = () => {
    setInvoiceData((prevState) => ({
      ...prevState,
      invoiceDetails: [
        ...prevState.invoiceDetails,
        {
          date: new Date().toLocaleDateString(),
          itemdescription: "",
          itemRate: 0,
          itemQty: 0,
          itemDiscount: 0.0,
          netAmount: 0.0,
        },
      ],
    }));
  };

  // Post invoice data to db.json
  const postInvoiceData = () => {
    axios
      .post("http://localhost:5000/invoices", invoiceData)
      .then((response) => {
        console.log("Invoice data posted:", response.data);
      })
      .catch((error) => {
        console.error("Error posting invoice data:", error);
      });
  };

  return (
    <div>
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
              <h6>Total Amount:</h6>
              <h6>Total Discount:</h6>
              <h6>Total Net Amount: </h6>
            </div>
          </div>
        </div>

        {/* Invoice Header Fields */}
        <div className="invoiceform">
          <form className="mx-1 mx-md-4">
            <div className="row">
              <div className="col">
                <label>Date: </label>
                <input
                  type="date"
                  name="date"
                  value={invoiceData.invoiceHeader.date}
                  onChange={handleInvoiceHeaderChange}
                />
              </div>

              <div className="col">
                <label>Cash Amount: </label>
                <input
                  type="number"
                  name="cashAmount"
                  value={invoiceData.invoiceHeader.cashAmount}
                  onChange={handleInvoiceHeaderChange}
                />
              </div>

              <div className="col">
                <label>Card Amount: </label>
                <input
                  type="number"
                  name="cardAmount"
                  value={invoiceData.invoiceHeader.cardAmount}
                  onChange={handleInvoiceHeaderChange}
                />
              </div>

              <div className="col">
                <label>Credit Amount: </label>
                <input
                  type="number"
                  name="creditAmount"
                  value={invoiceData.invoiceHeader.creditAmount}
                  onChange={handleInvoiceHeaderChange}
                />
              </div>
            </div>

            {/* Invoice Details (Items) */}
            {invoiceData.invoiceDetails.map((item, index) => (
              <div key={index}>
                <h2>Item {index + 1}</h2>
                <div>
                  <label>Date: </label>
                  <input
                    type="date"
                    name="date"
                    value={item.date}
                    onChange={(e) => handleInvoiceDetailChange(index, e)}
                  />
                </div>
                <div>
                  <label>Item Description: </label>
                  <input
                    type="text"
                    name="itemdescription"
                    value={item.itemdescription}
                    onChange={(e) => handleInvoiceDetailChange(index, e)}
                  />
                </div>
                <div>
                  <label>Item Rate: </label>
                  <input
                    type="number"
                    name="itemRate"
                    value={item.itemRate}
                    onChange={(e) => handleInvoiceDetailChange(index, e)}
                  />
                </div>
                <div>
                  <label>Item Quantity: </label>
                  <input
                    type="number"
                    name="itemQty"
                    value={item.itemQty}
                    onChange={(e) => handleInvoiceDetailChange(index, e)}
                  />
                </div>
                <div>
                  <label>Item Discount: </label>
                  <input
                    type="number"
                    name="itemDiscount"
                    value={item.itemDiscount}
                    disabled
                  />
                </div>
                <div>
                  <label>Net Amount: </label>
                  <input
                    type="number"
                    name="netAmount"
                    value={item.netAmount}
                    disabled
                  />
                </div>
              </div>
            ))}

            {/* Add More Items Button */}
            <button onClick={addItem}>Add More Items</button>

            {/* Submit Button */}
            <button onClick={postInvoiceData}>Post Invoice Data</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
