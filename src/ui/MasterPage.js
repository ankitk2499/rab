import React from "react";
import "../components/css/MasterPage.css";

export default function MasterPage(props) {
  return (
    <div className="container-fluid">
      <div className="container py-3">
        <h3 className="mb-3">{props.pageHead}</h3>
        <div className="row">
          {/* left column */}
          <div className="col-md-6">
            {/* general form elements */}
            <div className="card card-primary">
              <div className="card-header" style={{ backgroundColor: "#000" }}>
                <h5
                  className="card-title text-light p-1"
                  style={{ fontSize: "1rem" }}
                >
                  {props.pageHead}
                </h5>
              </div>
              {/* /.card-header */}
              {/* form start */}
              <form id='masterForm' onSubmit={(e) => {
                e.preventDefault()
                props.addMasterFunction(document.getElementById("masterState").value)
              }}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      {props.inputName}
                    </label>
                    <input
                      type="text"
                      className="form-control mb-1"
                      id="masterState"
                      placeholder={props.inputName}
                    />

                    {props.children}
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-primary "
                    id="submitstate"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/*/.col (left) */}
          {/* right column */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5
                  className="card-title text-dark fw-lighter p-1"
                  style={{ fontSize: "1rem" }}
                >
                  {props.listTitle}
                </h5>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th style={{ width: 10 }}>#</th>
                      <th>{props.masterType}</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.listItems && props.listItems.map((item, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{item.master_name}</td>
                          <td>
                            <button className="btn btn-outline-primary mx-1" >Edit</button>
                            <button className="btn btn-outline-danger mx-1" onClick={() => {
                              props.deleteMasterFunction(item.master_id)
                            }}>Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
          {/*/.col (right) */}
        </div>
        {/* /.row */}
      </div>
    </div>
  );
}
