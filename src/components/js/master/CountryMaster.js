import React, { useEffect, useState } from 'react'
import MasterPage from '../../../ui/MasterPage'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export default function CountryMaster() {

    const [country, setCountry] = useState([]);

    const getCountry = () => {
        axios({
            method: "get",
            url: baseurl + "/master/country"
        })
            .then((res) => {
                console.log(res.data)
                setCountry(res.data)
            });
    }

    const addCountryHandler = (title) => {
        axios({
            method: "post",
            url: baseurl + "/master/country",
            data: { country_name: title },
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const editCountryHandler = (masterID) => {
        axios({
            method: "put",
            url: baseurl + "/master/country/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const deleteCountryHandler = (masterID) => {
        axios({
            method: "delete",
            url: baseurl + "/master/country/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    useEffect(() => {
        getCountry()
    }, [])


    return (
        <div>
            <MasterPage pageHead={'Country Master'} listTitle={'Master Country'} masterType={'country'} inputName={'Country Name'} listItems={country} addMasterFunction={addCountryHandler} editMasterFunction={editCountryHandler} deleteMasterFunction={deleteCountryHandler} />
        </div>
    )
}
