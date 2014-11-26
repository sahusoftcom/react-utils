/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
require('./../common');

module.exports = React.createClass({

	componentDidMount: function () {

		var barOptions = (this.props.barOptions) ? this.props.barOptions : {};
		var gridOptions = (this.props.gridOptions) ? this.props.gridOptions : {};

		var defaultBarOptions = {
           barWidth: 0.8,
           lineWidth: 0,
           shadowSize: 0,
           align: 'right'
   		};

   		var defaultGridOptions = {
            tickColor: "#eee",
           	borderColor: "#eee",
           	borderWidth: 1
	          
   		};

		var options = {
	           series:{
	               bars:{show: true}
	           },
	           bars: jQuery.extend(defaultBarOptions, barOptions),            

	           grid: jQuery.extend(defaultGridOptions, gridOptions)
		   };

		jQuery.plot(this.refs.barChartNode.getDOMNode(),
		     [{
		        data: this.props.data,
		        lines: {
		            lineWidth: 1,
		        },
		        shadowSize: 0
		     }]
		     , options);
		
  	},

	render: function() {   

		var chartStyle = { padding: 0, position: 'relative' };
		var canvasStyle = { direction: 'ltr', position: 'absolute', left: 0, top: 0, width: 491, height: 300};

		return <div ref="barChartNode" className="chart" style={chartStyle}>
			<canvas className="flot-base" width="540" height="330" style={canvasStyle} >
			</canvas>

		</div>
	}

});