import React, { useState } 	from 'react';
import { LOGIN } 			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const LoginScreen = (props) => {
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Email/Password not found.";
	const [Login] = useMutation(LOGIN);

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {

		const { loading, error, data } = await Login({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			props.fetchUser();
			// props.reloadTodos();
			toggleLoading(false)
			props.setShowHome(true)
		};
	};


	return (
		<WModal className="login-modal" cover="true" visible={props.setShowLogin}>
			<WMHeader  className="modal-header" onClose={() => props.setShowHome(true)}>
				Login To Your Account
			</WMHeader>
			{
				loading ? <div />
					: <WMMain className="main-login-modal">
                        <WRow>
                        <WCol size="4">
                            <div className="login-text"> Email: </div>
                        </WCol>
                        <div className="modal-spacer">&nbsp;</div>
                        <WCol size="7">
                            <WInput className="modal-input" onBlur={updateInput} name='email' labelAnimation="up" 
							barAnimation="solid" labelText="*Enter Email Here*" wType="outlined" inputType='text' 
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
                        <WInput className="modal-input" onBlur={updateInput} name='password' labelAnimation="up" barAnimation="solid" labelText="*Enter Password Here*" wType="outlined" inputType='password' />
                        </WCol>
                        </WRow>
                        

						{
							showErr ? <div className='modal-error'>
								{errorMsg}
							</div>
								: <div className='modal-error'>&nbsp;</div>
						}

					</WMMain>
			}

            <WRow>
                <div className="modal-spacer">&nbsp;</div>
                <WCol size="4">
				    <WButton className="modal-button" onClick={handleLogin} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					    Login
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
		</WModal>
	);
}

export default LoginScreen;