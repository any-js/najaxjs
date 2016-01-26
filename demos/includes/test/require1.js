$najax.ready(function(target){
	console.log('require1');

	document.getElementById(target).innerHTML = 'Loaded require1.';

	return '1';
});
