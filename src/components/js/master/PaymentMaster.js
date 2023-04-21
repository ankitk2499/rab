import React, { useEffect, useState } from 'react'
import MasterPage from '../../../ui/MasterPage'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export default function PaymentMaster() {

    const [payment, setPayment] = useState([]);

    const getPayment = () => {
        axios({
            method: "get",
            url: baseurl + "/master/payment"
        })
            .then((res) => {
                console.log(res.data)
                setPayment(res.data)
            });
    }

    const addPaymentHandler = (payment) => {
        axios({
            method: "post",
            url: baseurl + "/master/payment",
            data: { payment_term: payment },
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const editPaymentHandler = (masterID) => {
        axios({
            method: "put",
            url: baseurl + "/master/payment/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const deletePaymentHandler = (masterID) => {
        axios({
            method: "delete",
            url: baseurl + "/master/payment/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    useEffect(() => {
        getPayment()
    }, [])


    return (
        <div>
            <MasterPage pageHead={'Payment Master'} listTitle={'Master Payment'} masterType={'payment'} inputName={'Payment Name'} listItems={payment} addMasterFunction={addPaymentHandler} editMasterFunction={editPaymentHandler} deleteMasterFunction={deletePaymentHandler} />
        </div>
    )
}
