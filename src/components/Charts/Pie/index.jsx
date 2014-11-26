/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
require('./../common');
require("./../flot/jquery.flot.pie.min");

module.exports = React.createClass({

	componentDidMount: function () {

		if(this.props.showLegend)
			var showLegend = true;
		else
			var showLegend = false;
		
		jQuery.plot(this.refs.pieChartNode.getDOMNode(), this.props.data, {
                    series: {
                        pie: {
                            show: true
                        }
                    },
                    legend: {
                        show: showLegend
                    }
                });
  	},

	render: function() {

		var chartStyle = { padding: 0, position: 'relative' };
		var canvasStyle = { direction: 'ltr', position: 'absolute', left: 0, top: 0, width: 491, height: 300};

		return <div ref="pieChartNode" className="chart" style={chartStyle}>

			<canvas className="flot-base" width="540" height="330" style={canvasStyle} >
			</canvas>


		</div>
	}

});