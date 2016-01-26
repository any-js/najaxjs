<?php

	if (isset($_GET['sleep'])){
		usleep($_GET['sleep']*1000);
	}

	header('HTTP', true, 503);
