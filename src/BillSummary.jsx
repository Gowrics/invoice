import React, { useContext } from "react";
import { FormContext } from "./FormContext";
import "./style.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const BillSummary = () => {
  const { invoiceData } = useContext(FormContext);

  const navigate = useNavigate(); // Initialize the navigate function

  if (!invoiceData.length) {
    return <p>Loading...</p>;
  }

  const downloadPDF = () => {
    const invoiceElement = document.getElementById("invoice-section");
    if (!invoiceElement) {
      console.error("Invoice section not found.");
      return;
    }

    html2canvas(invoiceElement, { scale: 1 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.5); // Compress the image quality to 0.5
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("invoice.pdf"); // Save the PDF with a filename
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const handlePrint = () => {
    setTimeout(() => {
      window.print();
      navigate("/");
      window.scrollTo(0, 0); // Scroll to top after printing
      window.location.reload("/");
      // Reload the page after printing
    }, 500);
  };

  return (
    <div id="invoice-section" className="invoice">
      <div className="headersec">
        <center>
          <h1>Logo Consulting Pvt Ltd</h1>
        </center>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            <b>Invoice Number:</b> {invoiceData[0]?.invoiceId || "0.00"}
            <br />
            <b> Invoice Date:</b> {invoiceData[0]?.invoiceDate || "0.00"}
            <br />
            <b> Invoice Date:</b> {invoiceData[0]?.email || "0.00"}
          </span>
          <p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <b> Invoice To:</b>
              <div>
                {invoiceData[0]?.customerName}
                <br />
                {invoiceData[0]?.customerCity}
                <br />
                {invoiceData[0]?.customerPhNum}
              </div>
            </div>
          </p>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <h6>Cash Amount: {invoiceData[0]?.cashAmount || "0.00"}</h6>
            <h6>Card Amount: {invoiceData[0]?.cardAmount || "0.00"}</h6>
            <h6>Credit Amount: {invoiceData[0]?.creditAmount || "0.00"}</h6>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table mt-5 border table-striped">
          <thead>
            <tr>
              <th scope="col">Item Description</th>
              <th scope="col">Item Rate</th>
              <th scope="col">Item Quantity</th>
              <th scope="col">Item Discount</th>
              <th scope="col">Item Net Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData[0].items && invoiceData[0].items.length > 0 ? (
              invoiceData[0].items.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemDescription}</td>
                  <td>{item.itemRate}</td>
                  <td>{item.itemQuantity}</td>
                  <td>{item.itemDiscount}</td>
                  <td>{item.itemNetAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No items available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-primary btn-print me-5"
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary btn-print"
          onClick={downloadPDF}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default BillSummary;
