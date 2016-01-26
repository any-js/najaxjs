<?php

	/**
	 * Paging sample.
	 */

	$all = 100;
	$response = array('location' => array('n' => null, 'all' => $all), 'list' =>array());

	$names = array('energy', 'fuel', 'engine', 'nuclear', 'steam', 'water', 'wind', 'air', 'stone', 'iron', 'gold', 'hydrogen');

	$n = (empty($_GET['n']))?1:$_GET['n'];
	$n = intval($n);

	$len = (empty($_GET['len']))?6:$_GET['len'];

	if ($n > $all/$len){
		$n = ceil($all/$len);
	}

	for ($i=1;$i<=$len;$i++){
		$num = ($n - 1)*$len + $i;

		if ($num <= $all){
			$name = $names[$num%count($names)];

			$response['list'][] = array(
				'no' => $num,
				'name' => $name,
				'md5' => md5($num),
				'crc' => crc32($name)
			);
		}
	}

	$response['location']['n'] = $n;

	print json_encode($response);
