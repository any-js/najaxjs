<script type="text/javascript">
	$('#tma-load').showing();
</script>

<div id="tma-load" style="display: none;">
<?php
	if (!empty($_GET['mode'])){
?>
<div style="width: 450px;" class="box4"><i><u><b><span class="name">Mars</span></b></u></i><br>
	<b>air</b> <span class="air">carbon dioxide</span>, <b>diameter</b> <span class="diameter">4200 miles</span><br>
	<b>revolution</b> <span class="revolution">687 days</span>, <b>satellites</b> <span class="satellites">2</span>
</div>
<?php
	}else{
?>
<div style="width: 450px;" class="box4"><i><u><b><span class="name">Jupiter</span></b></u></i><br>
	<b>air</b> <span class="air">hydrogen, helium</span>, <b>diameter</b> <span class="diameter">88250 miles</span><br>
	<b>revolution</b> <span class="revolution">11.9 years</span>, <b>satellites</b> <span class="satellites">28</span>
</div>
<?php
	}
?>
</div>
