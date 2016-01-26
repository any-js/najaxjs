function onclick(nm, fn){
	document.getElementById(nm).onclick = function(e){
		fn.call(this, e);

		return false;
	};
}

function onclicks(nm, fn){
	var cs = document.getElementsByClassName(nm);

	for (var i=0;i<cs.length;i++){
		cs[i].onclick = function(e){
			fn.call(this, e);

			return false;
		};
	}
}

function chg(fn){
	return function(e){
		fn(e, e.target.value);
	}
}

function onchanging(nm, fn){
	document.getElementById(nm).onchange = chg(fn);
	document.getElementById(nm).onkeydown = chg(fn);
}
