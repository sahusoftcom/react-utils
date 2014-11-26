'use strict';

module.exports = function(obj, notation){

	try {
		return eval('obj.'+notation);
	} catch(e) {
		return null;
	}
	
};