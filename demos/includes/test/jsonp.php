<?php

	if (isset($_GET['sleep'])){
		usleep($_GET['sleep']*1000);
	}

	if (empty($_GET['callback'])){
		print 'console.error(callback none);';
		exit;
	}

	$params = $_GET;
	$params['demo'] = 'Thisi is demo.';

	echo $_GET['callback'].'('.json_encode($params).');';
