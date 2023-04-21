import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/PODetails.css";

function PODetails() {
  useEffect(() => {});
  return (
    <div style={{ maxWidth: "70%" }}>
      <div className="border-start">
        <div className="d-flex justify-content-between p-2">
          <h3>ankit</h3>
          <div className="d-flex justify-content-center align-items-center">
            {/* <Link to={`/newitem/?id=${id}`}> */}
            <button type="button" className="btn btn-sm bg-light mx-2">
              <img src="/img/edit.svg" width="20px" height="20px" alt="" />
            </button>
            {/* </Link> */}
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
        <ul class="list-group list-group-horizontal bg-light">
          <li class="list-group-item bg-light">Edit</li>
          <li class="list-group-item bg-light">Send Main</li>
          <li class="list-group-item bg-light">PDF/Print</li>
          <li class="list-group-item bg-light">Mark as Issued</li>
        </ul>
        <div
          style={{
            maxWidth: "8.27in",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="pcs-template pt-5 ">
            <div className="pcs-template-body ">
              <table style={{ width: "100%", tableLayout: "fixed" }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "top", width: "50%" }}>
                      <img
                        style={{ width: "70px" }}
                        src="https://w7.pngwing.com/pngs/191/1014/png-transparent-logo-desktop-graphy-r-miscellaneous-television-emblem.png"
                      />
                      <br />
                      <span className="pcs-orgname">
                        <b>ABC</b>
                      </span>
                      <br />
                      <span className="pcs-label">
                        <span
                          style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                          }}
                        >
                          Madhya Pradesh India
                        </span>
                      </span>
                    </td>
                    <td
                      className="text-align-right"
                      style={{ verticalAlign: "top", width: "50%" }}
                    >
                      <span className="pcs-entity-title">PURCHASE ORDER</span>
                      <br />
                      <span style={{ fontSize: "10pt" }} className="pcs-label">
                        <b># PO-00006</b>
                      </span>
                      <div style={{ clear: "both", marginTop: 20 }}></div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                style={{
                  width: "100%",
                  marginTop: 30,
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <label
                          style={{ fontSize: "10pt" }}
                          className="pcs-label"
                        >
                          Vendor Address
                        </label>
                        <br />
                        <strong>
                          <span className="pcs-customer-name">
                            Mrs. second vendor
                          </span>
                        </strong>
                      </div>
                      <div
                        style={{
                          clear: "both",
                          width: "50%",
                          marginTop: 20,
                        }}
                      >
                        <label
                          style={{ fontSize: "10pt" }}
                          className="pcs-label"
                        >
                          Deliver To
                        </label>
                        <br />
                        <span>Ashu Agrawal Madhya Pradesh India</span>
                      </div>
                    </td>
                    <td
                      className="text-align-right"
                      style={{ verticalAlign: "bottom", width: "45%" }}
                    >
                      <table
                        style={{
                          width: "100%",
                        }}
                        border={0}
                        cellSpacing={0}
                        cellPadding={0}
                      >
                        <tbody>
                          <tr>
                            <td
                              className="text-align-right entity-details-padding"
                              style={{ fontSize: "10pt" }}
                            >
                              <span className="pcs-label">Date :</span>
                            </td>
                            <td
                              className="text-align-right"
                              style={{ width: "40%" }}
                            >
                              <span>18/04/2023</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                style={{
                  width: "100%",
                  marginTop: 20,
                  tableLayout: "fixed",
                }}
                className="pcs-itemtable"
                border={0}
                cellSpacing={0}
                cellPadding={0}
              >
                <thead>
                  <tr style={{ height: 32 }}>
                    <td
                      style={{
                        padding: "5px 0px 5px 5px",
                        width: "5%",
                        textAlign: "center",
                      }}
                      className="pcs-itemtable-header pcs-itemtable-breakword"
                    >
                      #
                    </td>
                    <td
                      style={{
                        padding: "5px 10px 5px 20px",
                        textAlign: "left",
                      }}
                      className="pcs-itemtable-header pcs-itemtable-breakword"
                    >
                      Item &amp; Description
                    </td>
                    <td
                      style={{
                        padding: "5px 10px 5px 5px",
                        width: "11%",
                        textAlign: "right",
                      }}
                      className="pcs-itemtable-header pcs-itemtable-breakword"
                    >
                      Qty
                    </td>
                    <td
                      style={{
                        padding: "5px 10px 5px 5px",
                        width: "11%",
                        textAlign: "right",
                      }}
                      className="pcs-itemtable-header pcs-itemtable-breakword"
                    >
                      Rate
                    </td>
                    <td
                      style={{
                        padding: "5px 10px 5px 5px",
                        width: "15%",
                        textAlign: "right",
                      }}
                      className="pcs-itemtable-header pcs-itemtable-breakword"
                    >
                      Amount
                    </td>
                  </tr>
                </thead>
                <tbody className="itemBody">
                  <tr className="breakrow-inside breakrow-after">
                    <td
                      valign="top"
                      style={{
                        padding: "10px 0 10px 5px",
                        textAlign: "center",
                        wordWrap: "break-word",
                      }}
                      className="pcs-item-row"
                    >
                      1
                    </td>
                    <td
                      valign="top"
                      style={{ padding: "10px 0 10px 20px" }}
                      className="pcs-item-row"
                    >
                      <div>
                        <div>
                          <span
                            style={{ wordWrap: "break-word" }}
                          >
                            oipoipo
                          </span>
                          <br />
                          <span
                            style={{
                              whiteSpace: "pre-wrap",
                              wordWrap: "break-word",
                            }}
                            className="pcs-item-desc"
                          />
                        </div>
                      </div>
                    </td>
                    <td
                      valign="top"
                      style={{
                        padding: "10px 10px 5px 10px",
                        wordWrap: "break-word",
                      }}
                      className="pcs-item-row text-align-right"
                    >
                      <span>1.00</span>
                      <div className="pcs-item-desc">box</div>
                    </td>
                    <td
                      valign="top"
                      style={{
                        padding: "10px 10px 5px 10px",
                        wordWrap: "break-word",
                      }}
                      className="pcs-item-row text-align-right"
                    >
                      <span>80.00</span>
                    </td>
                    <td
                      valign="top"
                      style={{ wordWrap: "break-word" }}
                      className="pcs-item-row text-align-right line-item-padding"
                    >
                      <span>80.00</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ width: "100%", marginTop: 1 }}>
                <div
                  className="float-section-left"
                  style={{
                    width: "45%",
                    padding: "3px 10px 3px 3px",
                    fontSize: "9pt",
                  }}
                >
                  <div style={{ whiteSpace: "pre-wrap" }} />
                </div>
                <div className="float-section-right" style={{ width: "50%" }}>
                  <table
                    className="pcs-totals"
                    cellSpacing={0}
                    border={0}
                    width="100%"
                  >
                    <tbody>
                      <tr className="text-align-right">
                        <td valign="middle" className="entity-details-padding">
                          Sub Total
                        </td>
                        <td
                          valign="middle"
                          className="line-item-padding"
                          style={{ width: 120 }}
                        >
                          80.00
                        </td>
                      </tr>
                      <tr>
                        <td
                          valign="middle"
                          className="text-align-right entity-details-padding"
                        >
                          Discount
                        </td>
                        <td
                          valign="middle"
                          className="text-align-right line-item-padding"
                          style={{ width: 120 }}
                        >
                          (-) 7.00
                        </td>
                      </tr>
                      <tr>
                        <td
                          valign="middle"
                          className="text-align-right entity-details-padding"
                        >
                          <b>Total</b>
                        </td>
                        <td
                          valign="middle"
                          className="text-align-right line-item-padding"
                          style={{ width: 120 }}
                        >
                          <b>₹73.00</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ clear: "both" }} />
              </div>
              <div style={{ pageBreakInside: "avoid" }}>
                <div style={{ marginTop: 30 }} className="">
                  <label className="pcs-label sign-label">
                    Authorized Signature
                  </label>
                  <div style={{ display: "table-cell" }}>
                    <div className="sign-border inline" />
                    <div />
                  </div>
                </div>
              </div>
            </div>
            <div className="pcs-template-footer">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PODetails;