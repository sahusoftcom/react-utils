/**
* @jsx React.DOM
*/

'use strict';

var React = require('react');
var Select2Component = require('components/Select2');
var resourceApiFactory = require('services/ResourceApiFactory');
var _ = require('lodash');

module.exports = React.createClass({

    getInitialState: function() {

        return {
            options: []
        }

    },

    getDefaultProps: function() {

        return {
            params: {}
        }

    },

    perPage: 500,

	onSelection: function(e, selectedData) {

		if(this.props.onSelection)
			this.props.onSelection(e, selectedData);

	},

    formatResult: function(row) {

        return eval('row.'+this.props.field);

    },

    formatSelection: function(row) {

        return eval('row.'+this.props.field);

    },

	getApiUrl: function() {

		return "/api/v1/"+this.props.model;

	},

    componentDidMount: function() {

        var that = this;

        if(this.props.prefetch) {

            this.options = [];

            var ApiService = resourceApiFactory.create(this.props.model);

            var perPageRequestObj = {per_page: this.perPage};

            var params = _.extend(perPageRequestObj, this.props.params);

            ApiService.getList(params).then(function(res) {

                if(res.meta.total > that.perPage)
                    alert("Consider using prefetch={false} for Select2Model where model='"+ that.props.model+"'");
                else
                    that.setState({options: res.result});

            }, function(res) {

                alert("Error occured in fetching results for Select2Model where model='"+that.props.model+"'");
                console.log(res);

            });

        }

    },

    render: function () {

    	var ajaxUrl = this.getApiUrl();

        var formatResult = (this.props.formatResult) ? this.props.formatResult : this.formatResult;

        var formatSelection = (this.props.formatSelection) ? this.props.formatSelection : this.formatSelection;

        this.select2Component = (this.props.prefetch) ? 

            <Select2Component
                multiple={this.props.multiple}
                minimumInputLength={0}
                styleWidth={this.props.styleWidth}
                options={this.state.options}
                formatSelection={formatSelection}
                formatResult={formatResult}
                defaultValue={this.props.defaultValue}
                onSelection={this.onSelection} />

            :

            <Select2Component
                multiple={this.props.multiple}
                minimumInputLength={1}
                params = {this.props.params}
                styleWidth={this.props.styleWidth}
                ajaxUrl={ajaxUrl}
                ajaxResponseArrayParam="result"
                formatSelection={formatSelection}
                formatResult={formatResult}
                defaultValue={this.props.defaultValue}
                onSelection={this.onSelection} />

        return (
            <div>
            	{this.select2Component}
            </div>
        );

    }

});