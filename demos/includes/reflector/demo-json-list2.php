<?php

    $list = ['Silicon', 'Plastic', 'Nickel', 'Aluminum', 'Lithium', 'Carbon fiber', 'Carbon nanotube', 'Titanium'];

    $response = [];

    foreach ($list as $name){
        $md5 = md5($name);

        $tm = date('Y-m-d H:i:s');

        $response['metals'][$name] = compact('md5', 'tm');
    }

    print json_encode($response);
