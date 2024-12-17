import React, { useContext } from "react";
import { FormContext } from "./FormContext";
import "./style.css";
import ItemList from "./ItemList";
import { Link } from "react-router-dom";

const Payment = () => {
  const { invoiceData, handleChange, handleSubmit } = useContext(FormContext);

  return (
    <div>
      <div className="invoice">
        <div className="headersec">
          <div className="head">
            <h1>Logo Consultdsding Pvt Ltd</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: "70px",
              }}
            >
              <p>Invoice Number</p> <p>Invoice Date</p>
            </div>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "0px 26   px",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h6>Total amount:</h6>
              <h6>Total Discount:</h6>
              <h6>Total Net amount: </h6>
            </div>
            <div>
              <h6>Total amount:</h6>
              <h6>Total Discount:</h6>
              <h6>Total Net amount: </h6>
            </div>
          </div>
        </div>
        {/* Head section end */}
        <div className="invoiceform">{/* Form section */}</div>
        <div className="table-responsive">
          <ItemList />
          <form className="mx-1 mx-md-4">
            <div className="row">
              <div className="col m-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Cash Amount"
                  name="cashAmount"
                  value={invoiceData[0].cashAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col m-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Card Amount"
                  name="cardAmount"
                  value={invoiceData[0].cardamount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col m-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Credit Amount"
                  name="creditAmount"
                  value={invoiceData[0].creditamount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="btn-group">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn m-1 btn-primary"
              >
                Proceed
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                Preview
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
