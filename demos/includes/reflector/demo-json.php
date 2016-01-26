<?php

    $v = (empty($_GET['v']))?'none':$_GET['v'];

    $md5 = md5($v);

    $tm = date('Y-m-d H:i:s');

    $response = compact('v', 'md5', 'tm');

    print json_encode($response);
