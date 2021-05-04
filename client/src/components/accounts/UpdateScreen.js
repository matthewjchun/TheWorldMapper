import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow } from 'wt-frontend';
import WCol from 'wt-frontend/build/components/wgrid/WCol';

const UpdateScreen = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: '' });
	const [loading, toggleLoading] = useState(false);
    const [Update] = useMutation(UPDATE);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		const { loading, error, data } = await Update({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
            props.setShowHome(true);

		};
	};

	return (
		<WModal className="signup-modal"  cover="true" visible={props.setShowUpdate}>
			<WMHeader  className="modal-header" onClose={() => props.setShowHome(true)}>
				Update Account Information
			</WMHeader>
			{
				loading ? <div />
					: <WMMain className="main-login-modal">
                            <WRow>
                                <WCol size="4">
                                    <div className="login-text"> Name: </div>
                                </WCol>
                                <div className="modal-spacer">&nbsp;</div>
                                <WCol size="7">
                                    <WInput
								    className="modal-input" onBlur={updateInput} name="name" labelAnimation="up"
								    barAnimation="solid" labelText="Name" wType="outlined" inputType="text" C
							        />
                                </WCol>
                            </WRow>

							<div className="modal-spacer">&nbsp;</div>

                            <WRow>
                                <WCol size="5">
                                    <div className="email-text"> Email Address: </div>
                                </WCol>
                                {/* <div className="modal-spacer">&nbsp;</div> */}
                                <WCol size="7">
                                    <WInput 
                                        className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
                                        barAnimation="solid" labelText="*Enter Email Address Here*" wType="outlined" inputType="text" 
                                    />
                                </WCol>
                            </WRow>

							<div className="modal-spacer">&nbsp;</div>

                            <WRow>
                                <WCol size="4">
                                    <div className="login-text"> Password: </div>
                                </WCol>
                                <div className="modal-spacer">&nbsp;</div>
                                <WCol size="7">
                                    <WInput 
                                        className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
                                        barAnimation="solid" labelText="*Enter Password Here*" wType="outlined" inputType="password" 
                                    />
                                </WCol>
                            </WRow>

					</WMMain>
			}

            <div className="modal-spacer">&nbsp;</div>

            <WRow>
                <div className="modal-spacer">&nbsp;</div>
                <WCol size="4">
                    <WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					    Submit
				    </WButton>
                </WCol>
                <div className="modal-spacer">&nbsp;</div>
                <WCol size="5">
				    <WButton className="modal-button" onClick={props.setShowHome} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					    Cancel
				    </WButton>
                </WCol>
                <div className="modal-spacer">&nbsp;</div>
            </WRow>
            <div className="modal-spacer">&nbsp;</div>

			{/* <WMFooter> */}
            {/* <WRow> */}
                {/* <WCol size="6"> */}

                {/* </WCol> */}
                {/* <WCol size="6">
                    <WButton className="modal-button" onClick={props.setShowHome(true)} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Cancel
				    </WButton>
                </WCol>
            </WRow> */}

			{/* </WMFooter> */}
			
		</WModal>
	);
}

export default UpdateScreen;
