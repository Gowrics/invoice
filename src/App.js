import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemForm from "./ItemForm";
import Payment from "./Payment";
import BillSummary from "./BillSummary";

const App = () => {
  return (
    <Router>
      <div className="app-container">
       
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<ItemForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/billsummary" element={<BillSummary />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
