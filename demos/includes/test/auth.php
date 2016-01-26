<?php

	if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])){
		if ($_SERVER['PHP_AUTH_USER'] != 'user' || $_SERVER['PHP_AUTH_PW'] != 'pass'){
			exit;
		}
	}else{
		header('WWW-Authenticate: Basic realm="auth"');
		header('HTTP/1.0 401 Unauthorized');
		exit;
	}

	$response = array('result' => true);
	$response+= $_POST;

	if (isset($_GET['sleep'])){
		usleep($_GET['sleep']*1000);
	}

	print json_encode($response);
