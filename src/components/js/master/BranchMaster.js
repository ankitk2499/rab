import React, { useEffect, useState } from 'react'
import MasterPage from '../../../ui/MasterPage'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export default function BranchMaster() {

    const [branch, setBranch] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [org, setOrg] = useState([]);

    const getBranch = () => {
        axios({
            method: "get",
            url: baseurl + "/master/branch"
        })
            .then((res) => {
                console.log(res.data)
                setBranch(res.data)
            });
    }
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
    const getOrg = () => {
        axios({
            method: "get",
            url: baseurl + "/master/organization"
        })
            .then((res) => {
                console.log(res.data)
                setOrg(res.data)
            });
    }

    const addBranchHandler = (branch) => {
        let ware = document.getElementById("ware").value
        let org = document.getElementById("org").value
        axios({
            method: "post",
            url: baseurl + "/master/branch",
            data: { branch_name: branch, warehouse_id: ware, organization_id: org },
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const editBranchHandler = (masterID) => {
        axios({
            method: "put",
            url: baseurl + "/master/branch/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const deleteBranchHandler = (masterID) => {
        console.log(masterID)
        axios({
            method: "delete",
            url: baseurl + "/master/branch/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    useEffect(() => {
        getWarehouse()
        getOrg()
        getBranch()
    }, [])


    return (
        <div>
            <MasterPage pageHead={'Branch Master'} listTitle={'Master Branch'} masterType={'branch'} inputName={'Branch Name'} listItems={branch} addMasterFunction={addBranchHandler} editMasterFunction={editBranchHandler} deleteMasterFunction={deleteBranchHandler} >
                <label htmlFor="ware">
                    Warehouse Name
                </label>

                <select id="ware" name="ware" form="masterForm" className="form-control">
                    {warehouse.map((warehouse) => {
                        return (
                            <option value={warehouse.master_id}>{warehouse.master_name}</option>
                        )
                    })}
                </select>

                <label htmlFor="org">
                    Organization Name
                </label>

                <select id="org" name="country" form="masterForm" className="form-control">
                    {org.map((org) => {
                        return (
                            <option value={org.organization_id}>{org.organization_name}</option>
                        )
                    })}
                </select>
            </MasterPage>
        </div>
    )
}
