import React, { useEffect, useState } from 'react'
import MasterPage from '../../../ui/MasterPage'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export default function TdsMaster() {

    const [tds, setTds] = useState([]);

    const getTds = () => {
        axios({
            method: "get",
            url: baseurl + "/master/tds"
        })
            .then((res) => {
                console.log(res.data)
                setTds(res.data)
            });
    }

    const addTdsHandler = (title) => {
        axios({
            method: "post",
            url: baseurl + "/master/tds",
            data: { tds_name: title },
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const editTdsHandler = (masterID) => {
        axios({
            method: "put",
            url: baseurl + "/master/tds/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const deleteTdsHandler = (masterID) => {
        axios({
            method: "delete",
            url: baseurl + "/master/tds/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    useEffect(() => {
        getTds()
    }, [])


    return (
        <div>
            <MasterPage pageHead={'TDS Master'} listTitle={'Master TDS'} masterType={'tds'} inputName={'TDS Name'} listItems={tds} addMasterFunction={addTdsHandler} editMasterFunction={editTdsHandler} deleteMasterFunction={deleteTdsHandler} />
        </div>
    )
}
