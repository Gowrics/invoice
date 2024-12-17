import React, { useContext } from "react";
import { FormContext } from "./FormContext";

const ItemList = () => {
  const { invoiceData } = useContext(FormContext);

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
          </tr>
        </thead>
        <tbody>
          {invoiceData[0].items.length > 0 ? (
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
              <td colSpan="5" className="text-center">
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
