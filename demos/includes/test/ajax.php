<?php

	$response = array('result' => true);
	$response+= $_POST;

	if (isset($_GET['sleep'])){
		usleep($_GET['sleep']*1000);
	}

	print json_encode($response);
