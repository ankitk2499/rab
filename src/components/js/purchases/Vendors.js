import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useNavigate, Link } from 'react-router-dom';
import Table from '../../../ui/Table';
import CustColModal from '../../../ui/CustColModal';
import { objectToArray } from '../../../helpers/ResponseHandler'
import axios from 'axios';


const baseurl = process.env.REACT_APP_BASE_URL
const itemPageResponseKeys = ["delivery_date", "po_number", "ref", "vendor_name", "", "", "amount", "delivery_date", ""]
let fullTablaData;

export default function Vendors() {

    const navigate = useNavigate();
    const [headings, setHeadings] = useState(['Vendor Name', "Company", 'Phone', 'Email'])
    const [tabledata, setTabledata] = useState([['Vendor1', "Company1", 'Phone1', 'Email1'], ['Vendor2', "Company2", 'Phone2', 'Email2']])


    useEffect(() => {
        // Submiting the customize columns modal
        $(document).on('submit', '#custCols', function (e) {
            e.preventDefault();
            var checkboxes = document.querySelectorAll('input.colList[type="checkbox"]');
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    $(`td:nth-child(${i + 2}),th:nth-child(${i + 2})`).show();
                }
                else {
                    $(`td:nth-child(${i + 2}),th:nth-child(${i + 2})`).hide();
                }
            }
            $('#model-close-btn').click();
        });
        // $('#custCols').submit(); //initially displaying default columns in table
        $(`td:nth-child(1),th:nth-child(1)`).width('50px'); // checkbox column width
        $('td:nth-child(1)').css("textAlign", 'right');


        // check all checkbox on checking the head one
        $("#headcheckbox").change(function () {
            if ($('#headcheckbox:checked').length == $('#headcheckbox').length) {
                $('td input:checkbox').prop('checked', true);
            }
        })

        // display second navbar on checking any checkbox
        $('table input[type=checkbox]').change(
            function () {
                if ($('td input:checkbox:checked').length > 0) {
                    $("#nav-op-1").addClass("d-none");
                    $("#nav-op-2").removeClass("d-none");
                }
                else {
                    $("#nav-op-2").addClass("d-none");
                    $("#nav-op-1").removeClass("d-none");
                }
                $('#totalPOText').html($('td input:checkbox:checked').length + "Vendors Selected")
            });

        // show customized columns on the table
        $('#custCols input[type=checkbox]').change(
            function () {
                $('#checked-boxes').html($('#custCols input:checkbox:checked').length + " of 9 Selected")
            });

        // set text
        $('#checked-boxes').html($('#custCols input:checkbox:checked').length + " of 9 Selected")

        //closing second nav
        $("#nav-close-btn").click(function () {
            $("#nav-op-2").addClass("d-none");
            $("#nav-op-1").removeClass("d-none");
        });
        // sorting the table;
        // $('#mainTable').DataTable({
        //     destroy: true,
        //     searching: false, paging: false
        // });
        $('#mainTable').width("100%");//setting table width

    })

    return (
        <>
            {/* modal to show/hide columns in the table */}
            <CustColModal columns={headings} />

            <nav className="navbar navbar-expand my-2 navbar-light">
                <div className="container-fluid">

                    {/* default containt of navbar */}
                    <div className="" id="nav-op-1">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                                        All Vendors
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                All
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                Active
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                CRM
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="d-flex" style={{ position: "absolute", right: 20 }}>
                                {/* <div className="btn-group"> */}

                                <Link to={'/vendors/newvendor'}>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        type="button"
                                        aria-expanded="false"
                                    >
                                        + New
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* content of navbar when an item is selected */}
                    <div id="nav-op-2" className="d-none" style={{ width: "100%" }}>
                        <div className="collapse navbar-collapse">
                            <button
                                className="btn btn-sm btn-primary"
                                type="button"
                                aria-expanded="false">
                                Bulk Update
                            </button>

                            <button type="button" className="btn btn-sm bg-light mx-3">
                                <img src="/img/del.png" width="20px" height="20px" alt="" />
                            </button>
                            <span style={{ fontSize: 12, color: "#A2A2A2" }} id="totalPOText" />
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
            </nav >
            {/* Nav Bar Closed */}
            < Table headings={headings}
                data={tabledata}
            />
        </>

    )
}
