<?php

	$response = array('result' => true);

	for ($i=0;$i<300000;$i++){
		$response['data'][$i] = 'Hello! Good bye.';
	}

	$data = json_encode($response);

	header('content-length: '.strlen($data));

	print $data;
