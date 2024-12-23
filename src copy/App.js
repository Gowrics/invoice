import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemForm from "./ItemForm";
import Payment from "./Payment";
import BillSummary from "./BillSummary";
import InvoiceDisplay from "./ItemSearch";
import EditItems from "./EditItems";
import InvoiceUpdate from "./InvoiceSearchById";
import InvoiceDelete from "./InvoiceDelete";

const App = () => {
  return (
    <Router>
      <div className="app-container">
       
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<ItemForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/billsummary" element={<BillSummary />} />
          <Route path="/editItems/:index" element={<EditItems />} />
          {/* <Route path="/itemsearch" element={<InvoiceDisplay />} /> */}
          <Route path="/invoiceupdate" element={<InvoiceUpdate />} />
          <Route path="/invoicedelete" element={<InvoiceDelete />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
