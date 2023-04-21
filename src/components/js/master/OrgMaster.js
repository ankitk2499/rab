import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import Table from "../../../ui/Table";
import CustColModal from "../../../ui/CustColModal";
import { objectToArray } from "../../../helpers/ResponseHandler";

const baseurl = process.env.REACT_APP_BASE_URL;

const orgMasterResponseKeys = [
  "organization_name",
  "address_name",
  "city",
  "gst_number",
  "Action",
];
let fullTablaData;

function OrgMaster() {
  const [headings, setHeadings] = useState([
    "Organization Name",
    "Address",
    "City",
    "GST Number",
    "Action",
  ]);
  const [tabledata, setTabledata] = useState([]);
  const navigate = useNavigate();
  const getItems = () => {
    axios({
      method: "get",
      url: baseurl + "/master/organization",
    })
      .then((res) => {
        console.log(res.data);
        fullTablaData = res.data;
        setTabledata(objectToArray(orgMasterResponseKeys, res.data));
      });
  };
  useEffect(() => {
    $(`td:nth-child(1),th:nth-child(1)`).width("50px"); // checkbox column width in the table
    $("td:nth-child(1)").css("textAlign", "right");

  }, [tabledata]);

  useEffect(() => {
    getItems();

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

    // check all checkbox on checking the head one
    $("#headcheckbox").change(function () {
      if ($("#headcheckbox:checked").length == $("#headcheckbox").length) {
        $("td input:checkbox").prop("checked", true);
      }
    });

    // show customized columns on the table
    $("#custCols input[type=checkbox]").change(function () {
      $("#checked-boxes").html(
        $("#custCols input:checkbox:checked").length + " of 6 Selected"
      );
    });

    $("#mainTable").width("100%"); //setting table width
  }, []);

  return (
    <div>
      {/* modal to show/hide columns in the table */}
      <CustColModal columns={headings} />
      <div className="table-details-container">
        <div className="tablebox">
          <nav className="navbar navbar-expand navbar-light">
            <div className="container-fluid">
              <div className="" id="nav-op-1">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <h3 className="">All Organisations</h3>
                  <div
                    className="d-flex"
                    style={{ position: "absolute", right: 20 }}
                  >
                    <Link to={"/newOrganization"}>
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        aria-expanded="false"
                      >
                        +New
                      </button>
                    </Link>
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

            </div>
          </nav>
          {/* Nav Bar Closed */}

          <Table headings={headings} data={tabledata} />
        </div>
      </div>
    </div>
  );
}

export default OrgMaster;
