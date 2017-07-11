/**
 * @jest-environment jsdom
 */

/**
 * External dependencies
 */
import { expect } from 'chai';
import sinon from 'sinon';
import useMockery from 'test/helpers/use-mockery';

describe( 'Search', function() {
	var React, TestUtils, EMPTY_COMPONENT;

	useMockery( mockery => {
		React = require( 'react' );
		TestUtils = require( 'react-addons-test-utils' );

		EMPTY_COMPONENT = require( 'test/helpers/react/empty-component' );

		mockery.registerMock( 'lib/analytics', {} );
		mockery.registerMock( 'gridicons', EMPTY_COMPONENT );
	} );

	before( function() {
		this.searchClass = require( '../' );
	} );

	describe( 'initialValue', function() {
		beforeEach( function() {
			this.onSearch = sinon.stub();
		} );

		context( 'with initialValue', function() {
			beforeEach( function() {
				this.initialValue = 'hello';
				this.searchElement = React.createElement( this.searchClass, {
					initialValue: this.initialValue,
					onSearch: this.onSearch
				} );
				this.rendered = TestUtils.renderIntoDocument( this.searchElement );
			} );

			it( 'should set state.keyword with the initialValue after mount', function() {
				expect( this.rendered.state.keyword ).to.equal( this.initialValue );
			} );
		} );
		context( 'without initialValue', function() {
			beforeEach( function() {
				this.searchElement = React.createElement( this.searchClass, {
					onSearch: this.onSearch
				} );
				this.rendered = TestUtils.renderIntoDocument( this.searchElement );
			} );

			it( 'should set state.keyword empty string after mount', function() {
				expect( this.rendered.state.keyword ).to.equal( '' );
			} );
		} );
	} );
} );
