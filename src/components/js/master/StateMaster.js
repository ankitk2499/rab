import React, { useEffect, useState } from 'react'
import MasterPage from '../../../ui/MasterPage'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export default function StateMaster() {

    const [state, setState] = useState([]);
    const [countries, setCountries] = useState([]);

    const getState = () => {
        axios({
            method: "get",
            url: baseurl + "/master/state"
        })
            .then((res) => {
                console.log(res.data)
                setState(res.data)
            });
    }
    const getCountry = () => {
        axios({
            method: "get",
            url: baseurl + "/master/country"
        })
            .then((res) => {
                console.log(res.data)
                setCountries(res.data)
            });
    }

    const addStateHandler = (state) => {
        let country = document.getElementById("coun").value
        axios({
            method: "post",
            url: baseurl + "/master/state",
            data: { state_name: state,country_id :country},
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const editStateHandler = (masterID) => {
        axios({
            method: "put",
            url: baseurl + "/master/state/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const deleteStateHandler = (masterID) => {
        axios({
            method: "delete",
            url: baseurl + "/master/state/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    useEffect(() => {
        getCountry()
        getState()
    }, [])


    return (
        <div>
            <MasterPage pageHead={'State Master'} listTitle={'Master State'} masterType={'state'} inputName={'State Name'} listItems={state} addMasterFunction={addStateHandler} editMasterFunction={editStateHandler} deleteMasterFunction={deleteStateHandler} >
                <label htmlFor="coun">
                    Country
                </label>

                <select id="coun" name="country" form="masterForm" className="form-control">
                    {countries.map((country) => {
                        return (
                            <option value={country.master_id}>{country.master_name}</option>
                        )
                    })}
                </select>
            </MasterPage>
        </div>
    )
}
