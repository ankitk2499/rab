import React, { useEffect, useState } from 'react'
import MasterPage from '../../../ui/MasterPage'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export default function GstMaster() {

    const [gst, setGst] = useState([]);

    const getGst = () => {
        axios({
            method: "get",
            url: baseurl + "/master/gst"
        })
            .then((res) => {
                console.log(res.data)
                setGst(res.data)
            });
    }

    const addGstHandler = (newgst) => {
        axios({
            method: "post",
            url: baseurl + "/master/gst",
            data: { gst_name: newgst },
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const editGstHandler = (masterID) => {
        axios({
            method: "put",
            url: baseurl + "/master/gst/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const deleteGstHandler = (masterID) => {
        axios({
            method: "delete",
            url: baseurl + "/master/gst/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    useEffect(() => {
        getGst()
    }, [])


    return (
        <div>
            <MasterPage pageHead={'GST Master'} listTitle={'Master GST'} masterType={'gst'} inputName={'GST Name'} listItems={gst} addMasterFunction={addGstHandler} editMasterFunction={editGstHandler} deleteMasterFunction={deleteGstHandler} />
        </div>
    )
}
