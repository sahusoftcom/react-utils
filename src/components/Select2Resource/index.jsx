/**
* @jsx React.DOM
*/

'use strict';

var React = require('react');
var _ = require('lodash');

var Select2Component = require('components/Select2');

module.exports = React.createClass({

    getInitialState: function() {

        var props = this.props;
        var triggerInputLength = this.props.minimumInputLength? this.props.minimumInputLength: (this.props.prefetch ? 0 : 1);

        return {
            minimumInputLength: triggerInputLength,
            options: []
        }

    },

    getDefaultProps: function() {

        return {
            apiBaseUrl: '/',
            prefetch: false,
            params: {},
            multiple: false,
            styleWidth: '50%'
        }

    },

    perPage: 500,

	onSelection: function(e, selectedData) {

		if (this.props.onSelection)
			this.props.onSelection(e, selectedData);

	},

    formatResult: function(row) {

        return eval('row.'+this.props.field);

    },

    formatSelection: function(row) {

        return eval('row.'+this.props.field);

    },

    componentDidMount: function() {

        var that = this;

        if (this.props.prefetch) {

            var resourceApiFactory = require('services/ResourceApiFactory');

            resourceApiFactory.setBaseUrl(this.props.apiBaseUrl);
            resourceApiFactory.setUrlPrefix('');
            resourceApiFactory.setUrlSuffix('');

            var ApiService = resourceApiFactory.create(this.props.model);

            var perPageRequestObj = {per_page: this.perPage};

            var params = _.extend(perPageRequestObj, this.props.params);

            ApiService.getList(params).then(function(res) {

                console.log(res);

                if (res.meta.total > that.perPage)
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

        var formatResult = this.props.formatResult ? this.props.formatResult : this.formatResult;
        var formatSelection = this.props.formatSelection ? this.props.formatSelection : this.formatSelection;

        this.select2Component = this.props.prefetch ?

            <Select2Component
                multiple = {this.props.multiple}
                minimumInputLength = {0}
                styleWidth = {this.props.styleWidth}
                options = {this.state.options}
                formatSelection = {formatSelection}
                formatResult = {formatResult}
                defaultValue = {this.props.defaultValue}
                onSelection = {this.onSelection} />

            :

            <Select2Component
                multiple = {this.props.multiple}
                minimumInputLength = {1}
                params = {this.props.params}
                styleWidth = {this.props.styleWidth}
                ajaxUrl = {this.props.apiBaseUrl}
                ajaxResponseArrayParam = "result"
                formatSelection = {formatSelection}
                formatResult = {formatResult}
                defaultValue = {this.props.defaultValue}
                onSelection = {this.onSelection} />

        return this.select2Component;

    }

});