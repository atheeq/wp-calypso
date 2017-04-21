/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import config from 'config';
import { createFormAndSubmit } from 'lib/form';
import LoginForm from './login-form';
import TwoFactorAuthentication from './two-factor-authentication';

class Login extends Component {
	static propTypes = {
		title: PropTypes.string,
		redirectLocation: PropTypes.string,
		twoFactorEnabled: PropTypes.bool,
	};

	state = {
		usernamePasswordValid: false,
		rememberMe: false,
	};

	handleValidUsernamePassword = ( { usernameOrEmail, password, rememberMe } ) => {
		if ( ! this.props.twoFactorEnabled ) {
			createFormAndSubmit( config( 'login_url' ), {
				log: usernameOrEmail,
				pwd: password,
				redirect_to: this.props.redirectLocation || window.location.origin,
				rememberme: rememberMe ? 1 : 0,
			} );
		} else {
			this.setState( {
				usernamePasswordValid: true,
				rememberMe,
			} );
		}
	};

	handleValid2FACode = () => {
		// TODO: submit the form to /wp-login with the 2FA code
	};

	renderContent() {
		const {
			title,
			twoFactorEnabled,
		} = this.props;

		const {
			rememberMe,
			usernamePasswordValid,
		} = this.state;

		if ( twoFactorEnabled && usernamePasswordValid ) {
			return (
				<TwoFactorAuthentication
					rememberMe={ rememberMe }
					onSuccess={ this.handleValid2FACode } />
			);
		}

		return (
			<LoginForm
				title={ title }
				onSuccess={ this.handleValidUsernamePassword } />
		);
	}

	render() {
		return (
			<div>
				{ this.renderContent() }
			</div>
		);
	}
}

export default connect(
	() => ( {
		twoFactorEnabled: true
	} ),
)( Login );
