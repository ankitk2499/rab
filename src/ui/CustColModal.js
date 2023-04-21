import React from 'react'

export default function CustColModal(props) {
    return (
        <div
            className="modal fade"
            id="customizationModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header modal-heading">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Customize Columns
                        </h1>
                        <div>
                            <span id="checked-boxes" />
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                    </div>
                    <form method="POST" id="custCols" className="form-inline my-2 my-lg-0">
                        <div className="modal-body">
                            {/* <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            /> */}
                            <div className="modal-form-list">
                                {props.columns.map((column) => {
                                    return (
                                        <span>
                                            <input
                                                className="colList"
                                                type="checkbox"
                                                defaultChecked={true}
                                            />
                                            {column}
                                        </span>
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                id='model-close-btn'
                            >
                                Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
