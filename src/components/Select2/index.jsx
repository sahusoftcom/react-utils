/**
* @jsx React.DOM
*/

'use strict';

var React = require('react');
require('./select2-3.5.1/select2.min.js');
require('./select2-3.5.1/select2.css');
require('./select2.less');
var _ = require('lodash');

module.exports = React.createClass({

    getDefaultProps: function() {

        return {
            styleWidth: '100%',
            multiple: false,
            options: [],
            minimumInputLength: 0,
            disabled: false,
            params: {}
        }

    },

    handleChange: function(e) {

        if (this.props.onSelection)
            this.props.onSelection(e, this.getInputElem().select2("data"));

    },

    getAjaxObj: function() {

        var that = this;

        var obj = {

            url: this.props.ajaxUrl,
            dataType: 'json',
            quietMillis: 250,
            minimumInputLength: (that.props.minimumInputLength) ? that.props.minimumInputLength : 1,
            data: function (term, page) {

                var searchParam = (that.props.searchParam) ? that.props.searchParam : 'q';

                var ret = {};
                ret[searchParam] = term;

                ret = _.extend(that.props.params, ret);

                return ret;

            },

            results: function (data, page) {

                var ajaxResponseArrayParam = (that.props.ajaxResponseArrayParam) ? data[that.props.ajaxResponseArrayParam] : data;

                return {
                    results: ajaxResponseArrayParam
                };

            }
        };

        return obj;

    },

    initselect2: function(select2Exists) {

        var that = this;

        if(select2Exists)
            this.destroy();

        var options = {
            data: this.props.options,
            multiple: this.props.multiple,
            minimumInputLength: (that.props.minimumInputLength!=undefined) ? that.props.minimumInputLength : 1
        };

        if(this.props.selectedOptionsIds)
            this.getInputElem().val(this.props.selectedOptionsIds);

        if(this.props.ajaxUrl)
            options.ajax = this.getAjaxObj();

        if(this.props.defaultValue) {

            this.getInputElem().val(0);

            options.initSelection = function(element, callback) {
                callback(that.props.defaultValue);
            };

        }

        if(this.props.formatResult)
            options.formatResult = this.props.formatResult;

        if(this.props.formatSelection)
            options.formatSelection = this.props.formatSelection;

        var select2Dom = this.getInputElem().select2(options);

        if(!select2Exists)
            select2Dom.on("change", this.handleChange);

        if(this.props.disabled)
            this.getInputElem().select2("readonly", true);

    },

    componentDidMount: function () {

        this.initselect2(false);

    },

    componentDidUpdate: function(prevProps) {

        if(prevProps.options != this.props.options)
            this.initselect2(true);

        else if(_.isArray(prevProps.options) && _.isArray(this.props.options) && this.props.options.length!=prevProps.options.length)
            this.initselect2(true);

    },

    getInputElem: function () {

        if(this.refs.select2Node)
            return jQuery(this.refs.select2Node.getDOMNode());

    },

    destroy: function() {

        this.getInputElem().select2('destroy');

    },

    render: function() {

        var style = {width: this.props.styleWidth};

        return (
            <div>
                <input type='hidden' name='input' ref="select2Node" style={style} />
            </div>
        );

    }

});