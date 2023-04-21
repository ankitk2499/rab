import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/ItemDetails.css";
import $ from "jquery";

const baseurl = process.env.REACT_APP_BASE_URL;

export default function ItemDetails() {
  const { id } = useParams();
  const [ItemDetails, setItemDetails] = useState({});
  const getItemDetails = (id) => {
    axios({
      method: "get",
      url: baseurl + "/items/" + id,
    }).then((res) => {
      console.log(res);
      setItemDetails(res.data);
    });
  };
  useEffect(() => {
    getItemDetails(id);
  }, [id]);
  useEffect(() => {
    //Runs only on the first render
    $("thead").hide();
    $($(`tbody tr td:not(:nth-child(1))`)).hide();
    $($(`tbody tr td:nth-child(2)`)).show();
  });

  return (
    <div style={{ minWidth: "70%" }}>
      <div className="px-2 border-start">
        <div className="d-flex justify-content-between py-2">
          <h3>{ItemDetails.item_name}</h3>
          <div className="d-flex justify-content-center align-items-center">
            <Link to={`/newitem/?id=${id}`}>
              <button type="button" className="btn btn-sm bg-light mx-2">
                <img src="/img/edit.svg" width="20px" height="20px" alt="" />
              </button>
            </Link>
            <div className="dropdown  mx-2">
              {/* <button className="dropdown-toggle btn btn-light">More</button> */}
            </div>
            <a href={"/items"}>
              <button
                type="button"
                className="btn-close mx-2"
                aria-label="Close"
              ></button>
            </a>
          </div>
        </div>
        <div className="position-relative">
          <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="ex1-tab-1"
                data-bs-toggle="tab"
                href="#ex1-tabs-1"
                role="tab"
                aria-controls="ex1-tabs-1"
                aria-selected="true"
              >
                Overview
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="ex1-tab-2"
                data-bs-toggle="tab"
                href="#ex1-tabs-2"
                role="tab"
                aria-controls="ex1-tabs-2"
                aria-selected="false"
              >
                Transactions
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="ex1-tab-3"
                data-bs-toggle="tab"
                href="#ex1-tabs-3"
                role="tab"
                aria-controls="ex1-tabs-3"
                aria-selected="false"
              >
                History
              </a>
            </li>
          </ul>
          <div className="tab-content" id="ex1-content">
            <div
              className="tab-pane fade show active"
              id="ex1-tabs-1"
              role="tabpanel"
              aria-labelledby="ex1-tab-1"
            >
              <div className="col-12">
                {/* <div className="row py-1">
                  <label className="col-3">Item Type</label>
                  <h6 className="col-9">Sales and Purchase Items</h6>
                </div>
                <div className="row pb-4">
                  <label className="col-3">Created Source</label>
                  <h6 className="col-9">User</h6>
                </div> */}

                <h5 className="pb-3 font-medium">Purchase Information</h5>
                <div className="row pb-1" style={{ marginRight: '0' }}>
                  <label className="col-3 items-label">Cost Price</label>
                  <h6 className="col-9">{`₹${ItemDetails.purchase_price}`}</h6>
                </div>
                {/* <div className="row pb-1">
                  <label className="col-3 items-label">
                    Purchase Account
                  </label>
                  <h6 className="col-9">Cost of Goods Sold</h6>
                </div> */}
                <div className="row pb-4" style={{ marginRight: '0' }}>
                  <label className="col-3 items-label">Description</label>
                  <h6 className="col-9 wrap text-break text-wrap">
                    {ItemDetails.purchase_description}
                  </h6>
                </div>


                <h5 className="pb-3 font-medium">Sales Information</h5>
                <div className="row" style={{ marginRight: '0' }}>
                  <label className="col-3 items-label">Selling Price</label>
                  <h6 className="col-9">{`₹${ItemDetails.selling_price}`}</h6>
                </div>
                {/* <div className="row">
                  <label className="col-3 items-label">Sales Account</label>
                  <h6 className="col-9">Sales</h6>
                </div> */}
                <div className="row" style={{ marginRight: '0' }}>
                  <label className="col-3 items-label">Description</label>
                  <h6 className="col-9 text-break text-wrap">
                    {ItemDetails.selling_description}
                  </h6>
                </div>


              </div>
            </div>
            <div
              className="tab-pane fade"
              id="ex1-tabs-2"
              role="tabpanel"
              aria-labelledby="ex1-tab-2"
            >
              Transactions
            </div>
            <div
              className="tab-pane fade"
              id="ex1-tabs-3"
              role="tabpanel"
              aria-labelledby="ex1-tab-3"
            >
              History
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
