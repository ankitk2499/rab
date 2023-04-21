import React, { useEffect } from 'react'
import tinymce from 'tinymce/tinymce';

export default function Email() {
    useEffect(() => {

        tinymce.init({
            selector: 'textarea',
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            // tinycomments_author: 'Author name',
            mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
            ],
        });


        var order = localStorage.getItem('order');
        var amount = localStorage.getItem('amount');
        var date = localStorage.getItem('date');
        var branch = localStorage.getItem('branch');
        var ele = document.getElementById('mailT');
        var subEle = document.getElementById('input4');
        subEle.value = 'Purchase order from ' + branch + ' (Purchase Order#:' + order + ')';
        ele.innerHTML = 'Dear AMAZING, <br>The purchase order (' + order + ') is attached with this email.<br>An overview of the purchase order is availabe below: <br>';
        ele.innerHTML += '<hr style="border-top: dashed 2px;">';
        ele.innerHTML += ' <span style="font-weight: bold; font-size:25px;">Purchase Order #:' + order + '</span><br>';
        ele.innerHTML += '<hr style="border-top: dashed 2px;">';
        ele.innerHTML += '<span style="font-weight: bolder;">Order Date :' + date + '</span><br>';;
        ele.innerHTML += '<span style="font-weight: bolder;">Amount :' + amount + '</span><br>';
        ele.innerHTML += '<hr style="border-top: dashed 2px;">';
        ele.innerHTML += '<span>Please go through it and confirm the order. We look forward to working with you again</span>'
    })

    return (
        <div style={{ overflow: "hidden" }}>
            <p className="h2">Email to Amazing</p>
            <hr />
            <form>
                <div className="row mb-3">
                    <label htmlFor="inputEmail1" className="col-sm-1 col-form-label mx-5">
                        From ?
                    </label>
                    <div className="col-sm-8">
                        <input type="email" className="form-control" id="inputEmail1" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="input2" className="col-sm-1 col-form-label mx-5">
                        Send To
                    </label>
                    <div className="col-sm-8">
                        <input className="form-control" id="input2" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="input3" className="col-sm-1 col-form-label mx-5">
                        Cc
                    </label>
                    <div className="col-sm-8">
                        <input className="form-control" id="input3" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="input4" className="col-sm-1 col-form-label mx-5">
                        Subject
                    </label>
                    <div className="col-sm-8">
                        <input className="form-control" id="input4" />
                    </div>
                </div>
                <div className="row mb-3" style={{ width: "66%", marginLeft: "15.3vw" }}>
                    <textarea name="" id="mailT" cols={30} rows={10}/>
                </div>

                <div style={{ margin: "3vw 0 3vw 15.3vw" }}>
                    <button
                        style={{
                            backgroundColor: "orangered",
                            border: "none",
                            marginRight: ".5vw"
                        }}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Send
                    </button>
                    <button
                        style={{ backgroundColor: "gray", border: "none" }}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
