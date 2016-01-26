$najax.ready(function(target){
	console.log('require2');

	document.getElementById(target).innerHTML = 'Loaded require2.';

	return '2';
});
