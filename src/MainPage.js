import React from "react";
import "./MainPage.css";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import PurchaseOrder from "./components/js/PurchaseOrder";
import Email from "./components/js/Email";
import Items from "./components/js/Items";
import NewItem from "./components/js/NewItem";
import TitleMaster from "./components/js/master/TitleMaster";
import GstMaster from "./components/js/master/GstMaster";
import TdsMaster from "./components/js/master/TdsMaster";
import PaymentMaster from "./components/js/master/PaymentMaster";
import CountryMaster from "./components/js/master/CountryMaster";
import StateMaster from "./components/js/master/StateMaster";
import WarehouseMaster from "./components/js/master/WarehouseMaster";
import BranchMaster from "./components/js/master/BranchMaster";
import POForm from "./components/js/POForm";
import ItemDetails from './components/js/ItemDetails'
import OrgMaster from './components/js/master/OrgMaster'
import OrgMasterForm from './components/js/master/OrgMasterForm'
import PODetails from './components/js/PODetails'
import Customers from './components/js/sales/Customers'
import Vendors from './components/js/purchases/Vendors'

export default function MainPage() {
    return (
        <section className="home-section">
            <div className="home-content">
                <header className='d-flex position-sticky' style={{ 'zIndex': "999", top: 0 }} >
                    <img src="https://css-tricks.com/wp-content/uploads/2012/10/threelines.png" style={{ width: '30px' }} alt="" id='sidebar_toggler' className="my-auto mx-2" />
                </header>
                <div>
                    <Routes>
                        <Route path='/purchases' element={<Outlet />} >
                            <Route path='orders' element={<PurchaseOrder />} >
                                <Route path=':id' element={<PODetails />} />
                            </Route>
                            <Route path="newpurchaseorder" element={<POForm />} />
                            <Route path="vendors" element={<Vendors />} />
                        </Route>
                        <Route path='/sales' element={<Outlet />} >
                            <Route path='customers' element={<Customers />} />
                        </Route>
                        <Route path='/master' element={<Outlet />} >
                            <Route path='title' element={<TitleMaster />} />
                            <Route path='gst' element={<GstMaster />} />
                            <Route path='tds' element={<TdsMaster />} />
                            <Route path='org' element={<OrgMaster />} />
                            <Route path='payment' element={<PaymentMaster />} />
                            <Route path='country' element={<CountryMaster />} />
                            <Route path='state' element={<StateMaster />} />
                            <Route path='warehouse' element={<WarehouseMaster />} />
                            <Route path='branch' element={<BranchMaster />} />
                        </Route>
                        <Route path='/newOrganization' element={<OrgMasterForm />} />
                        <Route path='/email' element={<Email />} />
                        <Route path='/Items' element={<Items />} >
                            <Route path=':id' element={<ItemDetails />} />
                        </Route>
                        <Route path='/newitem' element={<NewItem />} />
                    </Routes>
                </div>
            </div>
        </section>
    )
}
