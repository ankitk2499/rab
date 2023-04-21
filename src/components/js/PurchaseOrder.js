import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import "../css/PurchaseOrder.css"
import { useNavigate, Link } from 'react-router-dom';
import Table from '../../ui/Table';
import CustColModal from '../../ui/CustColModal';
import { objectToArray } from '../../helpers/ResponseHandler';
import axios from 'axios';


const baseurl = process.env.REACT_APP_BASE_URL
const itemPageResponseKeys = ["delivery_date", "po_number", "ref", "vendor_name", "", "", "amount", "delivery_date", ""]
let fullTablaData;

export default function PurchaseOrder() {

    const navigate = useNavigate();
    const [headings, setHeadings] = useState(['Date', "Purchase Order", 'REFERENCE', 'VENDOR NAME', 'STATUS', 'Billed', 'Amount', 'Delivery Date', 'Company'])
    const [tabledata, setTabledata] = useState([])

    const getPO = () => {
        axios({
            method: "get",
            url: baseurl + "/po"
        })
            .then((res) => {
                console.log(res.data)
                fullTablaData = res.data;
                setTabledata(objectToArray(itemPageResponseKeys, res.data));
            });
    }
    useEffect(() => {
        getPO()
    }, [])

  useEffect(() => {
    // Submiting the customize columns modal
    $(document).on("submit", "#custCols", function (e) {
      e.preventDefault();
      var checkboxes = document.querySelectorAll(
        'input.colList[type="checkbox"]'
      );
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          $(`td:nth-child(${i + 2}),th:nth-child(${i + 2})`).show();
        } else {
          $(`td:nth-child(${i + 2}),th:nth-child(${i + 2})`).hide();
        }
      }
      $("#model-close-btn").click();
    });
    // $('#custCols').submit(); //initially displaying default columns in table
    $(`td:nth-child(1),th:nth-child(1)`).width("50px"); // checkbox column width
    $("td:nth-child(1)").css("textAlign", "right");

    // check all checkbox on checking the head one
    $("#headcheckbox").change(function () {
      if ($("#headcheckbox:checked").length == $("#headcheckbox").length) {
        $("td input:checkbox").prop("checked", true);
      }
    });

    // display second navbar on checking any checkbox
    $("table input[type=checkbox]").change(function () {
      if ($("td input:checkbox:checked").length > 0) {
        $("#nav-op-1").addClass("d-none");
        $("#nav-op-2").removeClass("d-none");
      } else {
        $("#nav-op-2").addClass("d-none");
        $("#nav-op-1").removeClass("d-none");
      }
      $("#totalPOText").html(
        $("td input:checkbox:checked").length + "Purchase Orders Selected"
      );
    });

    // show customized columns on the table
    $("#custCols input[type=checkbox]").change(function () {
      $("#checked-boxes").html(
        $("#custCols input:checkbox:checked").length + " of 9 Selected"
      );
    });

    // set text
    $("#checked-boxes").html(
      $("#custCols input:checkbox:checked").length + " of 9 Selected"
    );

    //closing second nav
    $("#nav-close-btn").click(function () {
      $("#nav-op-2").addClass("d-none");
      $("#nav-op-1").removeClass("d-none");
    });

    // calling this on click of mail button
    // getting data of checked rows and sending to mail page
    $("#redirectToMail").click(function () {
      let chbxs = $("#tablebody :input:checkbox");
      $.each(chbxs, function (i, v) {
        if (v.checked) {
          let date = $(`#tablebody tr:eq(${i}) td:eq(${1})`).text();
          let pOrder = $(`#tablebody tr:eq(${i}) td:eq(${2})`).text();
          let amount = $(`#tablebody tr:eq(${i}) td:eq(${7})`).text();
          localStorage.setItem("date", date);
          localStorage.setItem("order", pOrder);
          localStorage.setItem("amount", amount);
          navigate("/email");
          return false;
        }
      });
    });
    // sorting the table;
    // $('#mainTable').DataTable({
    //     destroy: true,
    //     searching: false, paging: false
    // });
    $("#mainTable").width("100%"); //setting table width

    //on clicking pdf Button
    // getting data of checked rows and calling pdf function
    $("#pdfDownload").click(function () {
      let chbxs = $("#tablebody :input:checkbox");
      let date, pOrder;
      $.each(chbxs, function (i, v) {
        if (v.checked) {
          date = $(`#tablebody tr:eq(${i}) td:eq(${1})`).text();
          pOrder = $(`#tablebody tr:eq(${i}) td:eq(${2})`).text();
          return false;
        }
      });
      // pdfDownload(date, pOrder);
    });

  });

  return (
    <>
      {/* modal to show/hide columns in the table */}
      <CustColModal columns={headings} />

      <nav className="navbar navbar-expand my-2 navbar-light">
        <div className="container-fluid">
          {/* default containt of navbar */}
          <div className="" id="nav-op-1">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="dropdown-toggle btn btn-primary"
                    style={{ backgroundColor: "#0d6efd", borderRight: 0 }}
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All Purchase Orders
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        All
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Draft
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Pending Approval
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Approved
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Issued
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Billed
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Partially Billed
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Closed
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Canceled
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div
                className="d-flex"
                style={{ position: "absolute", right: 20 }}
              >
                <div className="btn-group">
                  <button
                    className="btn btn-primary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    +New
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <Link
                      to={"/purchases/newpurchaseorder"}
                      className="dropdown-item"
                    >
                      Create Purchase Order
                    </Link>
                    <Link
                      to={"/purchases/newpurchaseorder"}
                      className="dropdown-item"
                    >
                      Create Purchase Order (Pre GST)
                    </Link>
                  </ul>
                </div>
                {/* <button
                                    className="btn btn-sm mx-3"
                                    type="button"
                                    style={{ backgroundColor: "#f5f5f5" }}
                                >
                                    ...
                                </button>
                                <button className="btn btn-warning btn-sm" type="button">
                                    ?
                                </button> */}
              </div>
            </div>
          </div>

          {/* content of navbar when an item is selected */}
          <div id="nav-op-2" className="d-none" style={{ width: "100%" }}>
            <div className="collapse navbar-collapse">
              <div className="btn-group">
                <button
                  className="btn btn-sm dropdown-toggle btn-primary"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Bulk Actions
                </button>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" href="#">
                    Bulk Update
                  </li>
                  <li className="dropdown-item" href="#">
                    Mark as Issued
                  </li>
                  <li className="dropdown-item" href="#">
                    Bulk Cancel Items
                  </li>
                  <li className="dropdown-item" href="#">
                    Bulk reopen canceled items
                  </li>
                  <li className="dropdown-item" href="#">
                    Convert to Bill
                  </li>
                </ul>
              </div>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn btn-sm bg-light ms-3"
                  id="redirectToMail"
                >
                  <img src="/img/mail.png" width="20px" height="20px" alt="" />
                </button>
                <button
                  type="button"
                  className="btn btn-sm bg-light"
                  id="pdfDownload"
                >
                  <img src="/img/pdf.png" width="20px" height="20px" alt="" />
                </button>
                <button type="button" className="btn btn-sm bg-light">
                  <img src="/img/print.png" width="20px" height="20px" alt="" />
                </button>
              </div>
              <button type="button" className="btn btn-sm bg-light mx-3">
                <img src="/img/del.png" width="20px" height="20px" alt="" />
              </button>
              <span
                style={{ fontSize: 12, color: "#A2A2A2" }}
                id="totalPOText"
              />
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                id="nav-close-btn"
                style={{ marginLeft: "auto" }}
              />
            </div>
          </div>
        </div>
      </nav>
      {/* Nav Bar Closed */}
      <Table headings={headings} data={tabledata} />
    </>
  );
}
