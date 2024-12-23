import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormContext } from "./FormContext";

const InvoiceUpdate = () => {
  const { updateId, invoiceData, setUpdateId } = useContext(FormContext);

  const [invoice, setInvoice] = useState(null); // To store fetched invoice details
  const [isEditing, setIsEditing] = useState(false); // Flag to toggle edit mode
  const navigate = useNavigate();

  const handleInvoiceSearch = async () => {
    if (!updateId) {
      alert("Please enter an Invoice ID.");
      return;
    }

    try {
      const response = await axios.get(
        `http://192.168.91.201:8082/invoice/get/${updateId}`
      );

      if (response.data) {
        setInvoice(response.data);
        setIsEditing(true); // Allow editing after fetching invoice
      } else {
        alert("Invoice not found.");
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
      alert("Error fetching invoice details.");
    }
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Clone the existing invoice details array
    const updatedInvoiceDetails = [...invoice.invoiceDetails];

    // Update the specific field in the corresponding invoice detail
    updatedInvoiceDetails[index][name] =
      name === "itemDiscount" ||
      name === "itemQty" ||
      name === "itemRate" ||
      name === "netAmount"
        ? Number(value) // Convert to number for numerical fields
        : value; // Otherwise, keep as is for text fields

    // Update invoiceHeader directly if the name matches its fields
    const updatedInvoiceHeader = { ...invoice.invoiceHeader };
    if (
      name === "cashAmount" ||
      name === "cardAmount" ||
      name === "creditAmount" ||
      name === "date"
    ) {
      updatedInvoiceHeader[name] = name === "date" ? value : Number(value); // Convert to number or keep as is
    }

    if (
      !isNaN(updatedInvoiceDetails[index].itemRate) &&
      !isNaN(updatedInvoiceDetails[index].itemQty)
    ) {
      const itemRate = updatedInvoiceDetails[index].itemRate;
      const itemQty = updatedInvoiceDetails[index].itemQty;

      const itemDiscount = (itemRate * itemQty * 10) / 100; // Assuming 10% discount
      const itemNetAmount = itemRate * itemQty - itemDiscount;

      updatedInvoiceDetails[index] = {
        ...updatedInvoiceDetails[index],
        itemDiscount: parseFloat(itemDiscount.toFixed(2)),
        netAmount: parseFloat(itemNetAmount.toFixed(2)),
      };
    }

    // Update the state with the modified data
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      invoiceDetails: updatedInvoiceDetails,
      invoiceHeader: updatedInvoiceHeader,
    }));
  };

  const addItem = () => {
    setInvoice((prevState) => ({
      ...prevState,
      invoiceDetails: [
        ...prevState.invoiceDetails,
        {
          date: new Date().toLocaleDateString("en-CA"),
          itemdescription: "",
          itemRate: 0,
          itemQty: 0,
          itemDiscount: 0.0,
          netAmount: 0.0,
        },
      ],
    }));
  };

  const handleUpdateInvoice = async () => {
    try {
      const response = await axios.put(
        `http://192.168.91.201:8082/invoice/update/${updateId}`,
        invoice
      );

      if (response.status === 200) {
        alert("Invoice updated successfully.");
        navigate("/");
      } else {
        alert("Error updating invoice.");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Error updating invoice.");
    }
  };

  return (
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
            <p>
              Invoice Number:{" "}
              {invoice?.invoiceHeader?.invoiceNo || "Not Available"}
            </p>
            <p>
              Invoice Date: {invoice?.invoiceHeader?.date || "Not Available"}
            </p>
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
            {/* <h6>
              Total Amount: {Math.round(invoiceData[0]?.totalAmount || 0)}
            </h6>
            <h6>
              Total Discount: {Math.round(invoiceData[0]?.totalDiscount || 0)}
            </h6> */}
            <h6>Total Net Amount: {invoice?.invoiceDetails?.netAmount || 0}</h6>
          </div>
          <div>
            <h6>
              Total Cash Amount: {invoice?.invoiceHeader?.cashAmount || "0.00"}
            </h6>
            <h6>
              Total Card Amount:{invoice?.invoiceHeader?.cardAmount || "0.00"}
            </h6>
            <h6>
              Total Credit Amount:
              {invoice?.invoiceHeader?.creditAmount || "0.00"}
            </h6>
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="ms-5 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Invoice ID"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
            />
          </div>
          <div className="col-md-4 text-md-start mt-2 mt-md-0">
            <button
              className="btn btn-primary w-100"
              onClick={handleInvoiceSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {invoice && (
        <div className="invoice-details">
          <h4>Invoice Details</h4>

          <div className="row">
            <div className="col">
              <label>Cash Amount:</label>
              <input
                type="text"
                name="cashAmount"
                value={invoice.invoiceHeader.cashAmount || ""}
                disabled={!isEditing}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="col">
              <label>Card Amount:</label>
              <input
                type="text"
                name="cardAmount"
                value={invoice.invoiceHeader.cardAmount || ""}
                disabled={!isEditing}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="col">
              <label>Credit Amount:</label>
              <input
                type="text"
                name="creditAmount"
                value={invoice.invoiceHeader.creditAmount || ""}
                disabled={!isEditing}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            {invoice.invoiceDetails.map((item, index) => (
              <div key={index}>
                <h5>Item {index + 1}</h5>
                <div className="row">
                  <div className="col">
                    <label>Item Description:</label>
                    <input
                      type="text"
                      name="itemdescription"
                      value={item.itemdescription || ""}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div className="col mb-2">
                    <label>Item Rate:</label>
                    <input
                      type="number"
                      name="itemRate"
                      value={item.itemRate || ""}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div className="col">
                    <label>Item Quantity:</label>
                    <input
                      type="number"
                      name="itemQty"
                      value={item.itemQty || ""}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div className="col">
                    <label>Item Discount:</label>
                    <br />
                    <input
                      type="number"
                      name="itemDiscount"
                      value={item.itemDiscount || ""}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                  <div className="col">
                    <label>Net Amount:</label>
                    <br />
                    <input
                      type="number"
                      name="netAmount"
                      value={item.netAmount || ""}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>
                <hr />
              </div>
            ))}

            {isEditing && (
              <>
                <button onClick={handleUpdateInvoice}>Update Invoice</button>
                <button onClick={addItem}>Add More Items</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceUpdate;
