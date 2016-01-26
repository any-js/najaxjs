<?php

	$response = array('result' => true);

	$blob = file_get_contents('php://input');

	$response['size'] = strlen($blob);
	$response['head30byte'] = substr($blob, 0, 30);

	print json_encode($response);
