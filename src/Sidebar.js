import React, { useEffect } from "react";
import "./Sidebar.css";
import $ from "jquery";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
     useEffect(() => {
          $("#leftside-navigation .sub-menu > a").click(function (e) {
               $("#leftside-navigation ul ul").slideUp();
               $(this).next().is(":visible") || $(this).next().slideDown();
               e.stopPropagation();
          });
          $("#sidebar_toggler").click(function (e) {
               $(".sidebar").toggleClass("close");
               $(".myspan").toggleClass("mydisplay");
               $(".arrow").toggleClass("mydisplay");
          });
     }
     )
     return (
          <aside className="sidebar">
               <div className="navbar-brand py-3 mx-auto text-center">
                    <NavLink className="sidebar_item" to={"/"} style={{ textDecoration: 'none' }}>
                         <img
                              style={{ borderRadius: "16px" }}
                              src="https://us.123rf.com/450wm/dragomirescu/dragomirescu2111/dragomirescu211100012/176674160-gold-golden-r-alphabet-letter-icon-logo-design-company-template-for-luxury-business.jpg?ver=6"
                              width="30"
                              height="30"
                              alt=""
                         />
                         <span className="myspan mx-2" style={{ color: "black" }}><b>RADHIKA</b></span>
                    </NavLink>
               </div>
               <div id="leftside-navigation" className="nano">
                    <ul className="nano-content">

                         <li>
                              <NavLink className="sidebar_item" to={"/"}>
                                   <i className="fa fa-dashboard" />
                                   <span className="myspan">Dashboard</span>
                              </NavLink>
                         </li>
                         <li className="sub-menu">
                              <a className="sidebar_item">
                                   <i className="fa fa-cogs" />
                                   <span className="myspan">Master Data</span>
                                   <i className="arrow fa fa-angle-right pull-right" />
                              </a>
                              <ul>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/master/title"}>Title Master</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/master/gst"}>GST Treatment Master</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/master/payment"}>Payment Terms Master</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/master/tds"}>TDS Master</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/master/country"}>Country Master</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/master/state"}>State Master</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/master/warehouse"}>Warehouse Master</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/master/org"}>Organization Master</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/master/branch"}>Branch Master</NavLink>
                                   </li>
                              </ul>
                         </li>
                         <li className="sub-menu">
                              <NavLink className="sidebar_item" to={"/items"}>
                                   <i className="fa fa-table" />
                                   <span className="myspan">Items</span>
                              </NavLink>
                         </li>
                         <li className="sub-menu">
                              <a className="sidebar_item">
                                   <i className="fa fa fa-tasks" />
                                   <span className="myspan">Purchases</span>
                                   <i className="arrow fa fa-angle-right pull-right" />
                              </a>
                              <ul>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/purchases/vendors"}>Vendors</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/purchases/expenses"}>Expenses</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/purchases/recurring-expenses"}>
                                             Recurring Expenses
                                        </NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/purchases/orders"}>Purchase Orders</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/purchases/bills"}>Bills</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/purchases/payments"}>Payments Mode</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/purchases/recurring-bills"}>
                                             Recurring Bills
                                        </NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/purchases/vendors-credits"}>
                                             Vendor Credits
                                        </NavLink>
                                   </li>
                              </ul>
                         </li>


                         <li className="sub-menu">
                              <a className="sidebar_item">
                                   <i className="fa fa fa-tasks" />
                                   <span className="myspan">Sales</span>
                                   <i className="arrow fa fa-angle-right pull-right" />
                              </a>
                              <ul>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/sales/customers"}>Customers</NavLink>
                                   </li>
                              </ul>
                         </li>


                         <li className="sub-menu">
                              <a className="sidebar_item">
                                   <i className="fa fa-envelope" />
                                   <span className="myspan">Mail</span>
                                   <i className="arrow fa fa-angle-right pull-right" />
                              </a>
                              <ul>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/"}>Inbox</NavLink>
                                   </li>
                                   <li>
                                        <NavLink className="sidebar_item" to={"/"}>Compose Mail</NavLink>
                                   </li>
                              </ul>
                         </li>
                    </ul>
               </div>
          </aside>
     );
}
