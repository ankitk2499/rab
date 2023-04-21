import React, { useEffect, useState } from 'react'
import MasterPage from '../../../ui/MasterPage'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export default function WarehouseMaster() {

    const [warehouse, setWarehouse] = useState([]);

    const getWarehouse = () => {
        axios({
            method: "get",
            url: baseurl + "/master/warehouse"
        })
            .then((res) => {
                console.log(res.data)
                setWarehouse(res.data)
            });
    }

    const addWarehouseHandler = (warehouse) => {
        let warehouse_address = document.getElementById("ware").value
        axios({
            method: "post",
            url: baseurl + "/master/warehouse",
            data: { warehouse_name: warehouse, warehouse_address: warehouse_address },
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const editWarehouseHandler = (masterID) => {
        axios({
            method: "put",
            url: baseurl + "/master/warehouse/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const deleteWarehouseHandler = (masterID) => {
        axios({
            method: "delete",
            url: baseurl + "/master/warehouse/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    useEffect(() => {
        getWarehouse()
    }, [])


    return (
        <div>
            <MasterPage pageHead={'Warehouse Master'} listTitle={'Master Warehouse'} masterType={'warehouse'} inputName={'Warehouse Name'} listItems={warehouse} addMasterFunction={addWarehouseHandler} editMasterFunction={editWarehouseHandler} deleteMasterFunction={deleteWarehouseHandler} >
                <label htmlFor="ware">
                Warehouse Address
                </label>

                <textarea name="ware" id="ware" cols="30" rows="3" className='form-control'></textarea>
            </MasterPage>
        </div>
    )
}
