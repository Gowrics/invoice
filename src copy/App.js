import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemForm from "./ItemForm";
import Payment from "./Payment";

const App = () => {
  return (
    <Router>
      <div className="app-container">
       
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<ItemForm />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
