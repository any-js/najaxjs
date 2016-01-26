<?php
   $type = (isset($_GET['type']))?$_GET['type']:null;
   $type = ($type == 'star')?'star':'planet';
?>
$najax.ready($any.makeClass(function(el){
      this.el = el;
      this.type = '<?=$type ?>';
   }, {
   layout: function(){
      var txt;

      if (this.type == 'star'){
         txt = this.star();
      }else{
         txt = this.planet();
      }

      $(this.el).html('<b>' + this.type + '</b>'+ ': ' + txt);
   },
   star: function(){
      return 'A star is a luminous sphere of plasma held together by its own gravity';
   },
   planet: function(){
      return 'A planet is an astronomical object orbiting a s';
   }
}));
