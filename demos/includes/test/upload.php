<?php

	$response = array('result' => true);

	$response+= $_FILES;

	print json_encode($response);
