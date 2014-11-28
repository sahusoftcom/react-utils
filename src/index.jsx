/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/less/font-awesome.less');
require('./main.less');

window.jQuery = require('jquery');
window.$ = window.jQuery;

require('bootstrap/dist/js/bootstrap.js');

var components = require('./components.js');

var Button = require('react-bootstrap/Button');
var ModalTrigger = require('react-bootstrap/ModalTrigger');
var Modal = require('react-bootstrap/Modal');

React.renderComponent((
	<div>
        <div className="container">
            <div className="row">
            	<h2>List of React Utility Components</h2>
            	<table className="table table-bordered">
            		<tr>
            			<th>Ver.</th>
            			<th>Name of the component</th>
            			<th></th>
            		</tr>
            		{components.map(function(component) {

            			var reactClass =  <Modal title={component.name} animation={false}>
							<div className="modal-body">
								{component.example}
							</div>
						</Modal>;

						return <tr>
							<td>{component.serialNumber}</td>
							<td>{component.name}</td>
							<td>
								<ModalTrigger modal={reactClass}>
									<Button bsStyle="primary" bsSize="large">View</Button>
								</ModalTrigger>
							</td>
						</tr>;

            		})}
            	</table>
            </div>
        </div>
    </div>), document.getElementById('content')
);

module.exports = {};