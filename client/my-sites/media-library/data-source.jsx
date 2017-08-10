/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';
import SocialLogo from 'social-logos';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import PopoverMenu from 'components/popover/menu';
import PopoverMenuItem from 'components/popover/menu-item';

export class MediaLibraryDataSource extends Component {
	static propTypes = {
		source: React.PropTypes.string.isRequired,
		onSourceChange: React.PropTypes.func.isRequired,
	};

	constructor( props ) {
		super( props );

		this.state = { popover: false };
	}

	togglePopover = () => {
		this.setState( { popover: ! this.state.popover } );
	}

	changeSource = item => {
		const newSource = item.value ? item.value : item.target.getAttribute( 'action' );

		if ( newSource !== this.props.source ) {
			this.props.onSourceChange( newSource );
		}
	}

	renderScreenReader( selected ) {
		/* eslint-disable wpcalypso/jsx-classname-namespace */
		return (
			<span className="screen-reader-text">
				{ selected && selected.label }
			</span>
		);
		/* eslint-enable wpcalypso/jsx-classname-namespace */
	}

	renderMenuItems( sources ) {
		return sources.map( item =>
			<PopoverMenuItem
				action={ item.value }
				key={ item.value }
				onClick={ this.changeSource }
				isSelected={ item.value === this.props.source }>
				{ item.label }
			</PopoverMenuItem>
		);
	}

	render() {
		const { translate, source } = this.props;
		const sources = [
			{
				value: '',
				label: translate( 'WordPress' ),
				icon: <SocialLogo icon="wordpress" size={ 28 } />,
			},
			{
				value: 'google_photos',
				label: translate( 'Google' ),
				icon: <img src="/calypso/images/sharing/google-photos-logo.svg" width="28" height="28" />
			},
		];
		const currentSelected = find( sources, item => item.value === source );

		return (
			<div className="media-library__datasource">
				<Button
					borderless
					ref="popoverMenuButton"
					className="button media-library__source-button"
					onClick={ this.togglePopover }
					title={ translate( 'Choose media library source' ) }
				>
					{ currentSelected && currentSelected.icon }
					{ this.renderScreenReader( currentSelected ) }

					<PopoverMenu
						context={ this.refs && this.refs.popoverMenuButton }
						isVisible={ this.state.popover }
						position="bottom right"
						onClose={ this.togglePopover }
						className="is-dialog-visible media-library__header-popover">

						<div className="media-library__source-button-title">
							{ translate( 'Choose media library source:' ) }
						</div>

						{ this.renderMenuItems( sources ) }
					</PopoverMenu>
				</Button>
			</div>
		);
	}
}

export default localize( MediaLibraryDataSource );
