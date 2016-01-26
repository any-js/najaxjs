<?php

   $n = (!empty($_GET['n']))?$_GET['n']:0;
   $n++;

   if ($n > 3){
      header('Location: ajax.php');
      exit;
   }

   header('Location: redirect.php?n='.$n);
