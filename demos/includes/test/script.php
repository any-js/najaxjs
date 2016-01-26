<?php
	$json = json_encode($_GET);
?>

var v = 1 + 2 + 3 + 4 + 5;
var date = new Date();

console.log('[script]', v, date, <?=$json ?>);

function scriptFunc(){
	console.log('call from script.php');
}
