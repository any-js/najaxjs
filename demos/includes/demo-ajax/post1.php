<?php

	/**
	 * Post sample.
	 */

	$rows = array();

	function randTxt(){
		$names = array('energy', 'fuel', 'engine', 'nuclear' ,'steam', 'water', 'wind', 'air', 'stone', 'iron', 'gold', 'hydrogen');

		return $names[rand(0, count($names) - 1)];
	}

	$mode = (isset($_GET['mode']))?$_GET['mode']:null;

	$post = null;

	for ($i = 1; $i <= 5; ++$i){   //Random create
		$id = $i;

		$txt1 = randTxt();
		$txt2 = randTxt();
		$radio1 = rand(1, 2);
		$select1 = rand(1, 5);

		$rows[] = compact('id', 'radio1', 'txt1', 'txt2', 'radio1', 'select1');
	}

	if ($mode == 'post'){
		$post = $_POST;
		$post['id'] = (isset($_POST['now'])?$_POST['now']:0) + 1;

		$rows[] = $post;
	}

	print json_encode($rows);
