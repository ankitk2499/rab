import React from 'react'

export default function Table(props) {
    return (
        <div className="table-responsive p-1">
            <table className="table table-bordered table-striped" id="mainTable">
                <thead>
                    <tr id={0} className="">
                        <th style={{ display: "flex", justifyContent: "space-between", borderRight: "none" }}>
                            <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#customizationModal"
                                style={{ "padding": "2px" }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={14}
                                    height={14}
                                    fill="currentColor"
                                    className="bi bi-file-earmark-spreadsheet"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
                                </svg>
                            </button>
                            <input type="checkbox" id="headcheckbox" />
                        </th>
                        {props.headings.map((heading) => {
                            return (
                                <th>
                                    {heading}
                                </th>
                            )
                        }
                        )}
                    </tr>
                </thead>
                <tbody id="tablebody">
                    {props.data.map((row) => {
                        return (
                                <tr>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    {row.map((item) => {
                                        return (
                                            <td>{item}</td>
                                        )
                                    })}
                                </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
    )
}
