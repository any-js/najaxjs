<?php

	usleep(1500000);	//wait 1.5sec

	$item = null;

	$all = array(
		array(
			'name' => 'Mars',
			'diameter' => '4200 miles',
			'air' => 'carbon dioxide',
			'revolution' => '687 days',
			'satellites' => 2
		),
		array(
			'name' => 'Jupiter',
			'diameter' => '88250 miles',
			'air' => 'hydrogen, helium',
			'revolution' => '11.9 years',
			'satellites' => 28
		),
		array(
			'name' => 'Saturn',
			'diameter' => '74400 miles ',
			'air' => 'hydrogen, helium',
			'revolution' => '29.5 years',
			'satellites' => 30
		),
		array(
			'name' => 'Earth',
			'diameter' => '7900 miles',
			'air' => 'nitrogen, oxygen',
			'revolution' => '365.3 days',
			'satellites' => 1
		)
	);

	print json_encode($all);
