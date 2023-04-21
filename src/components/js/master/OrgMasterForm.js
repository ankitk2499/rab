import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";

const baseurl = process.env.REACT_APP_BASE_URL;

function OrgMasterForm() {
  const [state, setState] = useState([]);
  const [countries, setCountries] = useState([]);

  const getState = () => {
    axios({
      method: "get",
      url: baseurl + "/master/state",
    }).then((res) => {
      setState(res.data);
    });
  };
  const getCountry = () => {
    axios({
      method: "get",
      url: baseurl + "/master/country",
    }).then((res) => {
      setCountries(res.data);
    });
  };

  const addAssetHandler = () => {
    $("table#asset-table tbody").append(`
    <tr>
      <td style= "padding-left: 10px;">
        <div class="form-group">
          <input
           type="text"
           name="asset_name"
            class="form-control"
        />
        </div>
      </td>
    <td style= "padding-left: 10px;">
      <div class="form-group">
        <input
          type="text"
          name="asset_amount"
          class="form-control"
        />
      </div>
    </td>
  </tr>`)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let formData = {};

    $("#main-details-form :input").each(function () {
      formData[this.name] = this.value;
    });
    $("table#bank-table :input").each(function () {
      formData[this.name] = this.value;
    });

    let asset_details = [];
    let total_assets = $("table#asset-table tbody tr").length

    for (let i = 0; i < total_assets; i++) {
      let asset = {}
      $(`table#asset-table tbody tr:nth-child(${i + 1}) :input`).each(function () {
        asset[this.name] = this.value;
      });
      asset_details.push(asset)
    }

    formData['asset_details'] = asset_details;
    console.log(formData);
    axios({
      method: "post",
      url: baseurl + "/master/organization",
      data: formData,
    }).then((res) => {
      if (res.status === 200) {
        alert("Done");
        window.location.reload();
      }
      else {
        alert("Something went wrong! Please try again.");
      }
    });
  };

  useEffect(() => {
    getCountry();
    getState();
  }, []);

  return (
    <div className="container py-3 d-flex bg-light flex-column">
      <form id="orgform" onSubmit={submitHandler}>
        <h3 className="pb-3">Add Organization</h3>
        <div className="m-2 bg-white card">
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
                  Organization Profile
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
                  Asset Management
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
                  Bank Details
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
                {/* general form elements */}
                <div className="mx-3 card card-primary">
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#007bff" }}
                  >
                    <h3 className="card-title text-white">
                      Set up your organization profile
                    </h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <div className="card-body" id="main-details-form">
                    <div className="form-group">
                      <label
                        htmlFor="organization_name"
                        style={{ color: "red" }}
                      >
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        name="organization_name"
                        id="OrganizationName"
                        className="form-control"
                      // defaultValue={itemData.organization_name}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country_id" style={{ color: "red" }}>
                        Business Location
                      </label>
                      <select
                        className="form-control"
                        style={{ width: "100%" }}
                        name="country_id"
                        id="CountryId"
                        required
                        data-select2-id={1}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {countries.map((country) => {
                          return (
                            <option value={country.master_id}>
                              {country.master_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="state_id" style={{ color: "red" }}>
                        State Name *
                      </label>
                      <select
                        className="form-control"
                        style={{ width: "100%" }}
                        name="state_id"
                        id="StateId"
                        required
                        data-select2-id={4}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {state.map((state) => {
                          return (
                            <option value={state.master_id}>
                              {state.master_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="currency">Currency</label>
                      <input
                        type="text"
                        className="form-control"
                        name="currency"
                        id="Currency"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="opening_balance">Opening Balance</label>
                      <input
                        type="text"
                        className="form-control"
                        name="opening_balance"
                        id="OpeningBalance"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address_name" style={{ color: "red" }}>
                        Address *
                      </label>
                      <textarea
                        className="form-control"
                        name="address_name"
                        id="AddressName"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city" style={{ color: "red" }}>
                        City *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        id="City"
                        placeholder="City"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pin_code">Pin Code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pin_code"
                        id="Pin"
                        placeholder="Pin Code"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gst_number"> GST Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="gst_number"
                        id="GstNumber"
                        placeholder="GST Number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="language_"> Language</label>
                      <input
                        type="text"
                        className="form-control"
                        name="language_"
                        id="Language_"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="ex1-tabs-2"
                role="tabpanel"
                aria-labelledby="ex1-tab-2"
              >
                <div className="col-md-12 p-2">
                  <div className="card card-primary">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#007bff" }}
                    >
                      <h3 className="card-title text-white">Asset management</h3>
                    </div>
                    <div className="card-body">
                      <table id="asset-table">
                        <thead>
                          <tr>
                            <th>Asset Name</th>
                            <th>Asset Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ paddingLeft: "10px" }}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="asset_name"
                                  id="AssetName"
                                  autoComplete="off"
                                  className="form-control"
                                />
                              </div>
                            </td>
                            <td style={{ paddingLeft: "10px" }}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="asset_amount"
                                  id="AssetAmount"
                                  autoComplete="off"
                                  className="form-control"
                                />
                              </div>
                            </td>
                          </tr>

                        </tbody>
                      </table>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={addAssetHandler}
                        style={{ float: "right" }}
                      >
                        Add Asset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="ex1-tabs-3"
                role="tabpanel"
                aria-labelledby="ex1-tab-3"
              >
                <div className="col-md-12 p-2">
                  <div className="card card-primary">
                    <div
                      className="card-header"
                      style={{ backgroundColor: "#007bff" }}
                    >
                      <h3 className="card-title text-white">Bank Details</h3>
                    </div>
                    <div className="card-body">
                      <table id="bank-table">
                        <thead>
                          <tr>
                            <th>Beneficiary Name</th>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            <th>IFSC</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ paddingLeft: "10px" }}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="beneficiary_name"
                                  id="BeneficiaryName"
                                  autoComplete="off"
                                  className="form-control"
                                />
                              </div>
                            </td>
                            <td style={{ paddingLeft: "10px" }}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="bank_name"
                                  id="BankName"
                                  autoComplete="off"
                                  className="form-control"
                                />
                              </div>
                            </td>
                            <td style={{ paddingLeft: "10px" }}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="account_number"
                                  id="AccountNumber"
                                  autoComplete="off"
                                  className="form-control"
                                />
                              </div>
                            </td>
                            <td style={{ paddingLeft: "10px" }}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="ifsc"
                                  id="IFSC"
                                  autoComplete="off"
                                  className="form-control"
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end m-3">
            <button type="submit" className="btn btn-warning mx-1">
              Save
            </button>
            <button className="btn btn-primary mx-1">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrgMasterForm;
