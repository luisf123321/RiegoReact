import React, { Fragment } from 'react';




export default function ModelCultivo(){

    return(
        <Fragment>
            <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Recipient:</label>
                                <input type="text" className="form-control" id="recipient-name"/>
                            </div>
                            <div className="form-group">
                                <label for="message-text" className="col-form-label">Message:</label>
                                <textarea className="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary"  data-dismiss="modal">Send message</button>
                    </div>
                </div>
            </div>
            </div>
        </Fragment>
    ) 
}