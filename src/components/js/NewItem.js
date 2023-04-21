import axios from 'axios'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { useSearchParams } from 'react-router-dom';

const baseurl = process.env.REACT_APP_BASE_URL

export default function NewItem() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [itemData, setItemData] = useState({})
    const itemId = searchParams.get('id')
    const submitHandler = (e) => {
        let method = itemId ? "put" : "post";
        let url = baseurl + "/items"
        if (itemId) {
            url = url + `/${itemId}`
        }
        e.preventDefault()
        let formData = {};
        $("form#itemform :input").each(function () {
            formData[this.name] = this.value;
        });
        axios({
            method: method,
            url: url,
            data: formData
        })
            .then((res) => {
                if (res.status === 200) {
                    alert("Done")
                }
                else {
                    alert("Item not added! Please Try again")
                }
            });
    }

    const getItemDetails = (id) => {
        axios({
            method: "get",
            url: baseurl + "/items/" + id,
        }).then((res) => {
            console.log(res.data);
            setItemData(res.data)
        });
    };

    useEffect(() => {
        if (itemId) {
            getItemDetails(itemId)
        }
    }, [])

    return (
        <div className='container border rounded'>
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <div className="container-fluid">
                    <h2 className="h2">{itemId ? "Update Item" : 'New Item'}</h2>
                </div>
            </nav>
            <form onSubmit={(e) => {
                submitHandler(e);
            }} id='itemform'>
                <div className="row m-3">
                    <div className="col">
                        <label htmlFor="Name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="Name" name="item_name" defaultValue={itemData.item_name} />
                    </div>
                    <div className="col">
                        <label htmlFor="SKU" className="form-label">SKU</label>
                        <input type="text" className="form-control" id="SKU" name="sku" defaultValue={itemData.sku} />
                    </div>
                </div>
                <div className="row m-3">
                    <div className="col">
                        <label htmlFor="Unit" className="form-label">Unit</label>
                        <input type="text" className="form-control" id="Unit" name="unit" defaultValue={itemData.unit} />
                    </div>
                    <div className="col">
                        <label htmlFor="HSN Code" className="form-label">HSN Code</label>
                        <input type="text" className="form-control" id="HSN Code" name="hsn_code" defaultValue={itemData.hsn_code} />
                    </div>
                </div>
                <div className="row m-3">
                    <div className="col">
                        <label htmlFor="Tax Preference" className="form-label">Tax Preference</label>
                        <input type="text" className="form-control" id="Tax Preference" name="tax_preference" defaultValue={itemData.tax_preference} />
                    </div>
                    <div className="col">
                        {/* will have to fetch vendors from backend */}
                        <label htmlFor="Company Name" className="form-label">Company Name</label>
                        <input type="text" className="form-control" id="Company Name" name="company_name" defaultValue={itemData.company_name} />
                    </div>
                </div>
                <div className="row m-3">
                    <div className="col-6">
                        <label htmlFor="Size/class" className="form-label">Size/class</label>
                        <input type="text" className="form-control" id="Size/class" name="size_class" defaultValue={itemData.size_class} />
                    </div>
                </div>
                <div className="row m-3">
                    <div className="col">
                        <label htmlFor="Purchase Price" className="form-label">Purchase Price</label>
                        <input type="text" className="form-control" id="Purchase Price" name="purchase_price" defaultValue={itemData.purchase_price} />
                    </div>
                    <div className="col">
                        <label htmlFor="Selling Price" className="form-label">Selling Price</label>
                        <input type="text" className="form-control" id="Selling Price" name="selling_price" defaultValue={itemData.selling_price} />
                    </div>
                </div>
                <div className="row m-3">
                    <div className="col">
                        <label htmlFor="pDescription" className="form-label">Description</label>

                        <textarea name="purchase_description" id="pDescription" cols="30" rows="3" className='form-control' defaultValue={itemData.purchase_description} ></textarea>
                    </div>
                    <div className="col">
                        <label htmlFor="sDescription" className="form-label">Description</label>
                        <textarea name="selling_description" id="sDescription" cols="30" rows="3" className='form-control' defaultValue={itemData.selling_description} ></textarea>
                    </div>
                </div>
                <div className="m-3">
                    <button type="submit" className="btn btn-primary mx-2">Submit</button>
                    <button className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    )
}
