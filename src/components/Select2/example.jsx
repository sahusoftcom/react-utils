/**
 * @jsx React.DOM
 */

'use strict';

var Select2Component = require('./index.jsx');

var options = [
      {id: 0, text: "Saurabh"},
      {id: 1, text: "Sanket"},
      {id: 2, text: "Atul"},
      {id: 3, text: "Varun"}
    ];

var selectedOptionsIds = [1,2];

var onSelection = function(e, selectedData){
	console.log(e, selectedData);
}

var defaultData = [{id:101,type:'nonveg'},{id:102,type:'veg'}];

var ajaxUrl = "http://izzypos-webapp.ss.sahusoft.info/api/api/v1/dish?auth_token=eyJpdiI6ImVTSVUwRFBoNGJHaFlsSEJTZFwvbG9kQko3WnFRcGZrVUdOc0ZEOTIwRkZ3PSIsInZhbHVlIjoiRStaNGJoSkVmVnJSRnhwZWdoT3pTMmEydnFlY3h3eSt2bzVkYVpxeTAwcXM5XC9uQXR5WUxSaEttMUxNOEtta2VOSlgwVFhIZ2JuSEhEZFdMV0VjSDROOXhIR05DXC96YWh5dXYrN3daMTFla3NQVWFoUUZKUWhjSnlwak1qWXh0dVlFTm16aGVrN3pZYkFFcEdnazFFODlkVUxITEN1eWRhNGpXOUVTODRLSHM9IiwibWFjIjoiZmU3MTBhNGQ1YTdkM2ZhNjMwZjY5NTQxYmNlYmYzMWFkYzg1NDY0Nzc2ZTMzY2U1OTg2MzJhMWRmZmZlOGQ3NiJ9";

var formatResult = function(dish){
    return dish.type;
};

var formatSelection = function(dish){
    return dish.type;
};

module.exports = <Select2Component
					multiple={true}
					ajaxUrl={ajaxUrl}
					ajaxResponseArrayParam="result"
					formatSelection={formatSelection}
					formatResult={formatResult}
					onSelection={onSelection}
					defaultValue={defaultData}
					styleWidth="50%"
				/>;