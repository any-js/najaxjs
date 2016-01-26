'use strict';

/**
 * @ignore
 */
function args(vs){
	var r = [];

	for (var i=0;i<vs.length;i++){
		r.push(vs[i]);
	}

	return r;
}

/**
 * @ignore
 */
function ext(v, s, deep){
	if(!s){
		return v;
	}

	for (var k in s){
		if (s.hasOwnProperty(k)){
			if (deep && s[k] instanceof Object && s[k].constructor === Object){
				if (v[k] == null){
					v[k] = {};
				}
				v[k] = ext(v[k], s[k], deep);
			}else{
				v[k] = s[k];
			}
		}
	}

	return v;
}

/**
 * @ignore
 */
function extVs(s, w, v){
	if (typeof w === 'object'){
		ext(s, w, true);
	}else{
		s[w] = v;
	}
}

/**
 * @ignore
 */
function bind(c, fn){
	try{
		return fn.bind(c);
	} catch (e){

	}

	return function(){
		return fn.apply(c, arguments);
	};
}

/**
 * @ignore
 */
function clear(c){
	for (var k in c){
		if (c.hasOwnProperty(k)){
			delete c[k];
		}else{
			c[k] = null;
		}
	}
}

/**
 * @ignore
 */
function none(){

}
