import React, { useContext } from "react";
import axios from "axios";
import { FormContext } from "./FormContext";
import { Link } from "react-router-dom";

const ItemList = () => {
  const { invoiceData, setInvoiceData } = useContext(FormContext);
  console.log("itemw", invoiceData[0].items.itemDescription);
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Would you like to delete?");
    if (confirmDelete) {
      console.log("Attempting to delete the item with ID:", id);

      // Find the index of the item to remove
      const updatedInvoiceData = [...invoiceData];
      const itemIndex = updatedInvoiceData[0].items.findIndex(
        (item) => item.id === id
      );

      // If item is found, remove it from the array
      if (itemIndex !== -1) {
        updatedInvoiceData[0].items.splice(itemIndex, 1); // Remove the item by index

        // Recalculate the totals based on the remaining items
        const {
          totalAmount,
          totalDiscount,
          totalNetAmount,
          card,
          cash,
          credit,
        } = updatedInvoiceData[0].items.reduce(
          (totals, item) => {
            totals.totalAmount += parseFloat(item.itemNetAmount) || 0;
            totals.totalDiscount += parseFloat(item.itemDiscount) || 0;
            totals.totalNetAmount += parseFloat(item.itemNetAmount) || 0;
            return totals;
          },
          {
            totalAmount: 0,
            totalDiscount: 0,
            totalNetAmount: 0,
            cash: 0,
            card: 0,
            credit: 0,
          }
        );

        updatedInvoiceData[0].totalAmount = totalAmount.toFixed(2);
        updatedInvoiceData[0].totalDiscount = totalDiscount.toFixed(2);
        updatedInvoiceData[0].totalNetAmount = totalNetAmount.toFixed(2);
        updatedInvoiceData[0].cashAmount = cash.toFixed(2);
        updatedInvoiceData[0].cardAmount = card.toFixed(2);
        updatedInvoiceData[0].creditAmount = credit.toFixed(2);

        setInvoiceData(updatedInvoiceData); // Update the invoice data context
      } else {
        console.log("Item not found");
      }
    }
  };

  return (
    <div>
      <table className="table mt-5 border table-striped">
        <thead>
          <tr>
            <th scope="col">Item Description</th>
            <th scope="col">Item Rate</th>
            <th scope="col">Item Quantity</th>
            <th scope="col">Item Discount</th>
            <th scope="col">Item Net Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData[0].items && invoiceData[0].items.length > 0 ? (
            invoiceData[0].items.map((item, index) => (
              <tr key={index}>
                <td>{item.itemdescription}</td>
                <td>{item.itemRate}</td>
                <td>{item.itemQty}</td>
                <td>{item.itemDiscount}</td>
                <td>{item.netAmount}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)} // Correct reference to `item.id`
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {/* <button className="btn btn-primary">Edit</button> */}
                  <Link
                    to={`/editItems/${index}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                </td>
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
    </div>
  );
};

export default ItemList;
