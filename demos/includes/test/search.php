<?php

	$response = array();

	$v = (empty($_GET['txt']))?'value':$_GET['txt'];

	$list = array();

	for ($i=1;$i<=8;$i++){
		$list[] = $i.'. '.$v;
	}

	$response['list']= $list;

	print json_encode($response);
