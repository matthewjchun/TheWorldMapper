import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const Delete = (props) => {

    const handleDelete = async () => {
        props.deleteMap(props.activeid);
        console.log(props.activeid);
        props.setShowDelete(false);
    }

    return (
        <WModal className="delete-modal" cover="true" visible="true">
            <WMHeader  className="modal-header" onClose={() => props.setShowDelete(false)}>
                Delete Map?
			</WMHeader>

            <WMMain>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDelete(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
            </WMMain>

        </WModal>
    );
}

export default Delete;