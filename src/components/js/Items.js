import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import "../css/Items.css"
import "../css/PurchaseOrder.css"
import Table from '../../ui/Table';
import CustColModal from '../../ui/CustColModal';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { objectToArray } from '../../helpers/ResponseHandler';


const baseurl = process.env.REACT_APP_BASE_URL
const itemPageResponseKeys = ["item_name", "sku", "selling_description", "selling_price", "hsn_code"]
let fullTablaData;

export default function Items() {
    const [headings, setHeadings] = useState(['Name', "SKU", 'Description', 'Rate', 'HSN/CODE', 'Action']);
    const [tabledata, setTabledata] = useState([]);
    const navigate = useNavigate()
    
    const getItems = () => {
        axios({
            method: "get",
            url: baseurl + "/items"
        })
            .then((res) => {
                console.log(res)
                fullTablaData = res.data;
                setTabledata(objectToArray(itemPageResponseKeys, res.data));
            });
    }
    
    useEffect(() => {
        $(`td:nth-child(1),th:nth-child(1)`).width('50px'); // checkbox column width in the table
        $('td:nth-child(1)').css("textAlign", 'right');

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
                $('#totalPOText').html($('td input:checkbox:checked').length + "Items Selected")
            });

        // open new description page for each item in the table
        $("#tablebody tr td:not(:nth-child(1))").click(function (e) {
            navigate(`${fullTablaData[$(this).parent().index()].item_id}`)
        });
    }, [tabledata])


    useEffect(() => {
        getItems();

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


        // check all checkbox on checking the head one
        $("#headcheckbox").change(function () {
            if ($('#headcheckbox:checked').length == $('#headcheckbox').length) {
                $('td input:checkbox').prop('checked', true);
            }
        })

        // show customized columns on the table
        $('#custCols input[type=checkbox]').change(
            function () {
                $('#checked-boxes').html($('#custCols input:checkbox:checked').length + " of 6 Selected")
            });

        // set text
        $('#checked-boxes').html($('#custCols input:checkbox:checked').length + " of 6 Selected")

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

    }, [])

    return (
        <>
            {/* modal to show/hide columns in the table */}
            <CustColModal columns={headings} />
            <div className='table-details-container'>
                <div className="tablebox">
                    <nav className="navbar navbar-expand navbar-light">
                        <div className="container-fluid">
                            <div className="" id="nav-op-1">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item dropdown">
                                            <a
                                                className="dropdown-toggle btn btn-primary"
                                                href="#"
                                                id="navbarDropdown"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                All Items
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
                                                        Inative
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        Sales
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        Purchases
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        Services
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <div className="d-flex" style={{ position: "absolute", right: 20 }}>
                                        <Link to={'/newitem'}>
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
                                                Active
                                            </li>
                                            <li className="dropdown-item" href="#">
                                                Mark as Inactive
                                            </li>
                                            <li className="dropdown-item" href="#" id='deleteItem'>
                                                Delete
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="btn-group">
                                        <button
                                            className="btn btn-sm dropdown-toggle btn-primary ms-1"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            New Transaction
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li className="dropdown-item" href="#">
                                                Estimate
                                            </li>
                                        </ul>
                                    </div>
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
                    </nav>
                    {/* Nav Bar Closed */}

                    <Table headings={headings}
                        data={tabledata}
                    />
                </div>
                <Outlet />
            </div>
        </>

    )
}