import React, { useContext } from "react";
import { FormContext } from "./FormContext";
import "./style.css";
import ItemList from "./ItemList";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BillSummary = () => {
  const { invoiceData } = useContext(FormContext);

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

  return (
    <div id="invoice-section" className="invoice">
      <div className="headersec">
        <h1>Logo Consulting Pvt Ltd</h1>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Invoice Number: {invoiceData[0]?.invoiceId || "0.00"}</p>
          <p>Invoice Date: {invoiceData[0]?.invoiceDate || "0.00"}</p>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h6>Total Amount: {invoiceData[0]?.totalAmount || "0.00"}</h6>
            <h6>Total Discount: {invoiceData[0]?.totalDiscount || "0.00"}</h6>
            <h6>
              Total Net Amount: {invoiceData[0]?.totalNetAmount || "0.00"}
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
        <ItemList />
        <button
          type="button"
          className="btn btn-primary btn-print me-5"
          onClick={() => {
            setTimeout(() => {
              window.print();
            }, 500);
          }}
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
