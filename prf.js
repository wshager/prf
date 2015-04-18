({define:typeof define!="undefined"?define:function(deps, factory){module.exports = factory(exports);}}).
define(["exports"], function(exports){
	function z() {
		if(arguments.length!=1) throw new Error();
		return 0;
	}

	function s() {
		if(arguments.length!=1) throw new Error();
		var x = arguments[0];
		return x+1;
	}

	function i(n,i) {
		if (n <= 0 || i < 0 || i >= n) throw new Error();
		return function(){
			if(arguments.length != n) throw new Error();
			return arguments[i];
		};
	}

	//Composition function: C_{f, g_0, ..., g_{k-1}}(xs) = f(g_0(xs), ..., g_{k-1}(xs))
	function c() {
		var gs = Array.prototype.slice.call(arguments);
		if(gs.length<2) throw new Error();
		var f = gs.shift();
		//var myGs = gs.clone();  // Defensive copy
		for(var i=0;i<gs.length;i++) {
			if (gs[i] == null) throw new Error();
		}
		return function() {
			var xs = Array.prototype.slice.call(arguments);
			var temp = [];
			for(var i = 0; i < gs.length; i++){
				temp[i] = gs[i].apply(this,xs);
			}
			return f.apply(this,temp);
		};
	}


	// Primitive recursion: R_{f,g}(y, xs) = if (y == 0) then (f xs) else g(R_{f,g}(y-1, xs), y-1, xs)
	function r(f, g) {
		// Efficient evaluation - less iteration overhead (faster) and does not recurse on self (constant stack space)
		return function() {
			var xs = Array.prototype.slice.call(arguments);
			if(xs.length < 2) throw new Error();
			var val = f.apply(this,xs.slice(1));
			var temp = new Array(2).concat(xs.slice(1,xs.length));
			for(var i = 0, n = xs[0]; i < n; i++) {
				temp[0] = val;
				temp[1] = i;
				val = g.apply(this,temp);
			}
			return val;
		}
		// Naive evaluation - directly from the mathematical definition
		/*public long evalNaive(long... xs) {
			if (xs.length < 2)
				throw new IllegalArgumentException();
			long y = xs[0];
			if (y == 0)
				return f.eval(Arrays.copyOfRange(xs, 1, xs.length));
			else {
				long[] tempA = xs.clone();
				tempA[0] = y - 1;
				long[] tempB = new long[xs.length + 1];
				tempB[0] = eval(tempA);
				System.arraycopy(tempA, 0, tempB, 1, tempA.length);
				return g.eval(tempB);
			}
		}*/
	}
	
	exports.z = z;
	exports.s = s;
	exports.i = i;
	exports.c = c;
	exports.r = r;
	return exports;
});