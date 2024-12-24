import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "./FormContext";
import { Link } from "react-router-dom";

const Pagination = () => {
  const [data, setData] = useState([]); // To store the invoices array
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const { invoice, setUpdateId } = useContext(FormContext);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetch()
    //   `http://localhost:5000/invoices?page=${currentPage}&limit=${itemsPerPage}`
    // fetch(
    //   `http://192.168.91.201:8082/invoice/get/${currentPage}/${itemsPerPage}`
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          setData(responseData); // Extract the invoices array
        }
      })
      .catch((error) => {
        console.error(error);
        setData([]); // Handle fetch error
      });
  }, [currentPage, itemsPerPage]);

  console.log("Fetched Data:", data);

  // Pagination logic
  const totalPages = Math.ceil(data.totalCount / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  console.log("Current Items:", currentItems);
  // Filter invoices based on fromDate and toDate
  // Update the data fallback in filteredInvoices
  const filteredInvoices =
    fromDate && toDate
      ? currentItems.filter((inv) => {
          const invoiceDate = new Date(
            inv.invoiceHeader.date
          ).toLocaleDateString("en-CA");
          return (
            invoiceDate >= new Date(fromDate) && invoiceDate <= new Date(toDate)
          );
        })
      : data; // Use 'data' instead of 'invoice'

  // If no invoices match the date range, show the message
  //   if (filteredInvoices.length === 0) {
  //     return <p>No invoice data available for the selected date range.</p>;
  //   }

  return (
    <div>
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
                  <table className="table mt-5 border table-striped">
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
                  className="btn btn-primary me-4"
                  onClick={() => setUpdateId(inv.invoiceHeader.invoiceNo)}
                >
                  Update
                </Link>
                <Link
                  to="/invoicedelete"
                  className="btn btn-primary"
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
      {/* Pagination controls */}
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
