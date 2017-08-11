/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import MasterbarLoggedOut from 'layout/masterbar/logged-out';
import { getOAuth2ClientData, showOAuth2Layout } from 'state/login/selectors';
import { getSection } from 'state/ui/selectors';
import OauthClientLayout from 'layout/oauth-client';

const clients = {
	930: {
		name: 'vaultpress',
		img_url: 'https://vaultpress.com/images/vaultpress-wpcc-nav-2x.png',
		img_height: 50,
		img_width: 70,
	},
	973: {
		name: 'akismet',
		img_url: 'https://akismet.com/img/akismet-wpcc-logo-2x.png',
		img_height: 50,
		img_width: 70,
	},
	978: {
		name: 'polldaddy',
		img_url: 'https://polldaddy.com/images/polldaddy-wpcc-logo-2x.png',
		img_height: 50,
		img_width: 70,
	},
	1854: {
		name: 'gravatar',
		img_url: 'https://gravatar.com/images/grav-logo-2x.png',
		img_height: 50,
		img_width: 70,
	},
	50019: {
		name: 'woo',
		img_url: 'https://woocommerce.com/wp-content/themes/woomattic/images/logo-woocommerce@2x.png',
		img_height: 41,
		img_width: 200,
	},
	50915: {
		name: 'woo',
		img_url: 'https://woocommerce.com/wp-content/themes/woomattic/images/logo-woocommerce@2x.png',
		img_height: 41,
		img_width: 200,
	},
	50916: {
		name: 'woo',
		img_url: 'https://woocommerce.com/wp-content/themes/woomattic/images/logo-woocommerce@2x.png',
		img_height: 41,
		img_width: 200,
	},
};

const LayoutLoggedOut = ( {
	oauth2ClientData,
	primary,
	section,
	redirectUri,
	useOAuth2Layout,
} ) => {
	let client = null;
	if ( oauth2ClientData && oauth2ClientData.id in clients ) {
		client = clients[ oauth2ClientData.id ];
	}

	const classNameObject = {
		[ 'is-group-' + section.group ]: !! section,
		[ 'is-section-' + section.name ]: !! section,
		'focus-content': true,
		'has-no-sidebar': true, // Logged-out never has a sidebar
		'wp-singletree-layout': !! primary,
		dops: !! client,
	};

	if ( client ) {
		classNameObject[ client.name ] = !! client;
	}

	let masterbar = <MasterbarLoggedOut title={ section.title } sectionName={ section.name } redirectUri={ redirectUri } />;
	if ( useOAuth2Layout && client ) {
		masterbar = <OauthClientLayout client={ client } />;
	}

	return (
		<div className={ classNames( 'layout', classNameObject ) }>
			{ masterbar }
			<div id="content" className="layout__content">
				<div id="primary" className="layout__primary">
					{ primary }
				</div>
				<div id="secondary" className="layout__secondary">
				</div>
			</div>
		</div>
	);
};

LayoutLoggedOut.displayName = 'LayoutLoggedOut';
LayoutLoggedOut.propTypes = {
	primary: PropTypes.element,
	secondary: PropTypes.element,
	section: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.object,
	] ),
	redirectUri: PropTypes.string,
	showOAuth2Layout: PropTypes.bool,
};

export default connect(
	state => ( {
		section: getSection( state ),
		oauth2ClientData: getOAuth2ClientData( state ),
		useOAuth2Layout: showOAuth2Layout( state ),
	} )
)( LayoutLoggedOut );
