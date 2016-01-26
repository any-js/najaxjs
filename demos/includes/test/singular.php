<?php

	usleep(1500000);	//wait 1.5sec

	$item = null;

	$all = array(
		'mars' => array(
			'name' => 'Mars',
			'diameter' => '4200 miles',
			'air' => 'carbon dioxide',
			'revolution' => '687 days',
			'satellites' => 2
		),
		'jupiter' => array(
			'name' => 'Jupiter',
			'diameter' => '88250 miles',
			'air' => 'hydrogen, helium',
			'revolution' => '11.9 years',
			'satellites' => 28
		),
		'saturn' => array(
			'name' => 'Saturn',
			'diameter' => '74400 miles ',
			'air' => 'hydrogen, helium',
			'revolution' => '29.5 years',
			'satellites' => 30
		),
		'earth' => array(
			'name' => 'Earth',
			'diameter' => '7900 miles',
			'air' => 'nitrogen, oxygen',
			'revolution' => '365.3 days',
			'satellites' => 1
		)
	);


	if (empty($_GET['list'])){
		$planet = (isset($_GET['planet']))?$_GET['planet']:'';

		switch($planet){
		case 'mars':
		case 'jupiter':
		case 'saturn':
			$item = $all[$planet];
			break;
		default:
			$item = $all['earth'];

			break;
		}
	}else{
		$item = array_map(function($v){
			return $v['name'];
		}, $all);
	}

	print json_encode($item);
