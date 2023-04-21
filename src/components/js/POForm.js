import "../css/POForm.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";

const baseurl = process.env.REACT_APP_BASE_URL;

function POForm() {
  const [branch, setBranch] = useState([]);
  const [state, setState] = useState([]);
  const [paymentTerm, setPaymentTerm] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([])

  const getBranch = () => {
    axios({
      method: "get",
      url: baseurl + "/master/branch"
    })
      .then((res) => {
        console.log(res.data)
        setBranch(res.data)
      });
  }
  const getPaymentTerm = () => {
    axios({
      method: "get",
      url: baseurl + "/master/payment"
    })
      .then((res) => {
        console.log(res.data)
        setPaymentTerm(res.data)
      });
  }
  const getState = () => {
    axios({
      method: "get",
      url: baseurl + "/master/state",
    }).then((res) => {
      setState(res.data);
    });
  };
  const getItems = () => {
    axios({
      method: "get",
      url: baseurl + "/items"
    })
      .then((res) => {
        console.log(res.data)
        setItems(res.data)
      });
  }

  // const getVendor = () => {
  //   axios({
  //     method: "get",
  //     url: baseurl + "/",
  //   }).then((res) => {
  //     setState(res.data);
  //   });
  // };

  const onSelectingItem = (e) => {
    axios({
      method: "get",
      url: baseurl + "/items/" + e.target.value,
    })
      .then((res) => {
        console.log(res.data);
        let item_data = res.data
        let tr = e.target.parentElement.parentElement
        let keys = ["company_name", "size/class", '', "selling_price"]
        let all_inputs = $(tr).find("input")
        all_inputs.each(function (i) {
          if (i == 0 || i == 1 || i == 3) {
            this.value = item_data[keys[i]]
          }
        })
        all_inputs[2].value = '1'
      });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let formData = {};
    let items = [];
    let obj = {}
    $("#form-top :input").each(function () {
      formData[this.name] = this.value;
    });
    $("#form-bottom :input").each(function () {
      formData[this.name] = this.value;
    });
    $("#items-table :input").each(function () {
      obj[this.name] = this.value;
    });
    items.push(obj)
    formData['items'] = items
    console.log(formData);
    axios({
      method: "post",
      url: baseurl + "/po",
      data: formData,
    }).then((res) => {
      if (res.status === 200) {
        alert("Puchase Order added Successfully");
      }
      else {
        alert("Something went wrong! Please try again.");
      }
    });
  }

  useEffect(() => {
    $(`td,th`).width('100px');
    $(`td:nth-child(1),th:nth-child(1)`).width('200px');
  })
  useEffect(() => {
    getBranch()
    getPaymentTerm()
    getState()
    getItems()
  }, [])


  return (
    <div className="card card-primary m-4">
      <div className="card-header mb-2" style={{ backgroundColor: "#007bff" }}>
        <h4 className="card-title text-white">Add New Vendor</h4>
      </div>

      {/* form start */}
      <div className="container my-2">
        <form id="po-form" onSubmit={(e) => {
          e.preventDefault()
          submitHandler(e)
        }}>
          <div className="row g-3" id="form-top">
            <div className="col-6">
              <label htmlFor="vendorName" className="form-label">
                Vendor Name *
              </label>
              <select id="vendorName" className="form-select" name="vendor_id" required>
                <option value={'1'}>Choose...</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="supplySource" className="form-label">
                Source Of Supply *
              </label>
              <select id="supplySource" className="form-select" name="source_state">
                {state.map((item) => {
                  return (
                    <option value={item.master_id}>{item.master_name}</option>
                  )
                })}
              </select>
            </div>

            <div className="col-6">
              <label htmlFor="destination" className="form-label">
                Destination Of Supply *
              </label>
              <select id="destination" className="form-select" name="dest_state">
                {state.map((item) => {
                  return (
                    <option value={item.master_id}>{item.master_name}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="branch" className="form-label">
                Branch
              </label>
              <select id="branch" className="form-select" name='branch_id'>
                {branch.map((branch) => {
                  return (
                    <option value={branch.master_id}>{branch.master_name}</option>
                  )
                })}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="del" className="form-label">
                Deliver To *
              </label>
              <div className="d-flex justify-content-around">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="deliver_to"
                    id="warehouse"
                    value='warehouse'
                  />
                  <label className="form-check-label" htmlFor="warehouse">
                    Warehouses
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="deliver_to"
                    id="customer"
                    value='customer'
                  />
                  <label className="form-check-label" htmlFor="customer">
                    Customer
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="purchaseOrder" className="form-label">
                Purchase Order#
              </label>
              <input
                type="text"
                className="form-control"
                id="purchaseOrder"
                name="po_number"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="reference" className="form-label">
                Reference #
              </label>
              <input
                type="text"
                className="form-control"
                id="reference"
                name="reference"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="payment_terms" className="form-label">
                Payment Terms
              </label>
              <select id="payment_terms" className="form-select" name="payment_terms">
                {paymentTerm.map((item) => {
                  return (
                    <option value={item.master_id}>{item.master_name}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="deliveryDate" className="form-label">
                Expected Delivery Date
              </label>
              <input
                type="date"
                className="form-control"
                id="deliveryDate"
                name="delivery_date"
              />
            </div>
          </div>
          <div className="col-12 mt-2">
            <div className="d-flex">
              <div className="card card-table flex-fill">
                <div className="card-header" style={{ backgroundColor: "#007bff", color: "white" }}>
                  <h4 className="card-title mb-0" >Item Details</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table custom-table table-nowrap mb-0" id="items-table">
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>COMPANY NAME</th>
                          <th>SIZE / CLASS</th>
                          <th>QUANTITY</th>
                          <th>RATE</th>
                          <th>TAX</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <select id="itemName" className="form-select" name="item_id" onChange={onSelectingItem} placeholder="jouh">
                              <option disabled selected>select an item</option>
                              {items.map((item) => {
                                return (
                                  <option value={item.item_id}>{item.item_name}</option>
                                )
                              })}
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="company_name"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              name="size"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              name="quantity"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              name="rate"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              name="tax"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              name="amount"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <button type="button" className="btn btn-warning mybtn me-4">Add Item</button>
              </div>
            </div>
          </div>
          <div id="form-bottom">
            <div className="row my-2">
              <div className="col-md-6 ms-auto">
                <label className="form-label"> Sub Total :55</label>
                <div className="form-group">
                  <label className="form-label" htmlFor="discount">Discount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="discount"
                    name="discount"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="tcs">TCS</label>
                  <input
                    type="number"
                    className="form-control"
                    id="tcs"
                    name="tcs"
                  />
                </div>
                <div className="form-group">
                  <h4>Total : 55</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Terms &amp; Conditions </label>
                  <textarea
                    className="form-control"
                    name="terms_and_conditions"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Attach File(s) to Purchase Order </label>
                  <input
                    type="File"
                    className="form-control"
                    name="po_image"
                  />
                </div>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn mx-1 btn-warning">
                Save
              </button>
              <button className="btn mx-1 btn-warning">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default POForm;
