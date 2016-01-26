<?php

   $split = (empty($_GET['tsv']))?',':"\t";

   $rows = [
      [1, 2, 3, 4, 5, 6],
      ['a', 'b', 'c', 'd', 'e', 'f'],
      ['Stone', 'Bronze', 'Iron', 'Gold', 'Uranium', 'Silicon', 'Rare earth element']
   ];

   foreach ($rows as $row){
      print implode($split, $row)."\n";
   }

