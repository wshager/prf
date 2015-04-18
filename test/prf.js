define(function (require) {
	var test = require('intern!object'),
		assert = require('intern/chai!assert'),
		prf = require('../prf');
	
	test({
		name: 'rql/test/prf',

		testPrf: function () {
			var Z=prf.z,
				S=prf.s,
				I=prf.i,
				C=prf.c,
				R=prf.r;
			var add = R(I(1,0), C(S, I(3,0)));
			var mul = R(Z, C(add, I(3,0), I(3,2)));
			assert.strictEqual(add(2,2),4);
			assert.strictEqual(mul(4,5),20);
			assert.strictEqual(mul(4.4,5.5),24.2);
		}
	});
});
