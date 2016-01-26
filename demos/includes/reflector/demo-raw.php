<?php
    $v = (empty($_GET['v']))?'none':$_GET['v'];

    $md5 = md5($v);
?>

<div class="box4">
<b><?=$v ?></b> description.<br>

<?=$md5 ?>
</div>