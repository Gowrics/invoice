import React, { useEffect, useState } from "react";
import { FormContext } from "./FormContext";
import axios from "axios";

export const FormProvider = ({ children }) => {
  const [invoice, setInvoice] = useState([]);
  const [invoiceId, setInvoiceId] = useState(0);
  const [form, setForm] = useState({
    itemDescription: "",
    itemRate: "",
    itemQuantity: "",
    itemDiscount: "",
    itemNetAmount: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:8004/invoiceData")
      .then((res) => {
        setInvoice(res.data); // Update the invoice state
        console.log("Fetched invoice data:", invoice); // Log the fetched data, not the current state
      })
      .catch((err) => console.error("Error fetching invoice data:", err));
  }, []); // Add an empty dependency array to ensure it runs only once

  const generateInvoiceNo = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const sequenceNum = Math.floor(1000 + Math.random() * 9000); // Generating a random 4-digit number
    return `${day}${month}-${sequenceNum}`;
  };
  const [invoiceData, setInvoiceData] = useState([
    {
      invoiceId: generateInvoiceNo(),
      invoiceDate: new Date().toLocaleDateString(),
      email: "inquery@logo.io",
      cashAmount: "0",
      cardAmount: "0",
      creditAmount: "0",
      totalCashAmount: "",
      totalCardAmount: "",
      totalCreditAmount: "",
      totalAmount: "", // This should hold the sum of all items' net amounts
      totalDiscount: "", // This should hold the sum of all items' discounts
      totalNetAmount: "", // This should hold the sum of all items' net amounts after discount
      items: [],
      customerName: "",
      customerCity: "",
      customerPhNum: "",
    },
  ]);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update invoiceData when cashAmount, cardAmount, or creditAmount changes
    if (
      name === "cashAmount" ||
      name === "cardAmount" ||
      name === "creditAmount" ||
      name === "customerName" ||
      name === "customerCity" ||
      name === "customerPhNum"
    ) {
      const updatedInvoiceData = [...invoiceData];
      updatedInvoiceData[0] = {
        ...updatedInvoiceData[0],
        [name]: value, // Update the specific field in invoiceData
      };
      setInvoiceData(updatedInvoiceData);
    }

    let updatedForm = { ...form, [name]: value };

    if (name === "itemRate" || name === "itemQuantity") {
      const itemRate =
        name === "itemRate" ? parseFloat(value) : parseFloat(form.itemRate);
      const itemQuantity =
        name === "itemQuantity"
          ? parseFloat(value)
          : parseFloat(form.itemQuantity);

      if (!isNaN(itemRate) && !isNaN(itemQuantity)) {
        const itemDiscount = (itemRate * itemQuantity * 10) / 100;
        const itemNetAmount = itemRate * itemQuantity - itemDiscount;

        updatedForm = {
          ...updatedForm,
          itemDiscount: itemDiscount.toFixed(2),
          itemNetAmount: itemNetAmount.toFixed(2),
        };
      }
    }
    setForm(updatedForm);
  };

  // Handle form submission (Add item)
  const handleAddItem = () => {
    if (
      !form.itemNetAmount ||
      !form.itemDiscount ||
      isNaN(parseFloat(form.itemNetAmount)) ||
      isNaN(parseFloat(form.itemDiscount))
    ) {
      alert("Please fill in all required fields before adding an item.");
      return;
    }
    const newItem = { ...form };

    // Add the new item to the items array
    const updatedInvoiceData = [...invoiceData];
    updatedInvoiceData[0].items.push(newItem);

    // Recalculate totals
    const { totalAmount, totalDiscount, totalNetAmount } =
      updatedInvoiceData[0].items.reduce(
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
        }
      );

    updatedInvoiceData[0].totalAmount = totalAmount.toFixed(2);
    updatedInvoiceData[0].totalDiscount = totalDiscount.toFixed(2);
    updatedInvoiceData[0].totalNetAmount = totalNetAmount.toFixed(2);

    setInvoiceData(updatedInvoiceData);
    console.log("........", invoiceData);
    // Clear the form
    setForm({
      itemDescription: "",
      itemRate: "",
      itemQuantity: "",
      itemDiscount: "",
      itemNetAmount: "",
    });
  };
  // const handleSubmit = () => {
  //   // const newItem = { ...form };

  //   // // Add the new item to the items array
  //   // const updatedInvoiceData = [...invoiceData];
  //   // updatedInvoiceData[0].items.push(newItem);

  //   // setInvoiceData(updatedInvoiceData);

  //   // Send updated data to backend
  //   axios
  //     .post("http://localhost:8004/invoiceData", invoiceData)
  //     .then(() => {
  //       console.log("Invoice updated successfully", invoiceData);
  //     })
  //     .catch((error) => console.error("Error updating invoice:", error));
  // };

  return (
    <FormContext.Provider
      value={{
        form,
        invoice,
        setForm,
        handleChange,
        handleAddItem,
        invoiceData,
        setInvoiceData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
