<?php

   $method = $_SERVER['REQUEST_METHOD'];

   $response = [];

   switch($method){
   case 'POST':
      $response = ['id' =>1];

      break;
   case 'PUT':
      $response = ['id' =>1];

      break;
   case 'DELETE':
      $response = ['id' =>1];

      break;
   case 'GET':
   default:
      if ($_SERVER['PATH_INFO'] != "/"){
         $response = ['id' =>1, 'stone' => 'STONE', 'iron' => 'IRON'];
      }else{
         $response = [
            ['id' => 1, 'stone' => 'STONE', 'iron' => 'IRON'],
            ['id' => 2, 'stone' => 'STONE', 'iron' => 'IRON']
         ];
      }

      break;
   }

   print json_encode($response);