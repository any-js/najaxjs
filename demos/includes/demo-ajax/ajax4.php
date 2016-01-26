<script type="text/javascript">
	myspace.module1 = function(el){
		var c = $('#mdl1-block').cloneShow($(el).find('.module'), {add: 'fill'});

		c.find('.btn-close').clicked(function(){
			$(this).closest('.module').hideDel();
		});

		var txt = c.find('.desc').text();

		var i=0;
		setInterval(function(){
			i++;
			c.find('.desc').text(txt.substr(0, i));
		}, 60);
	};
</script>

<div class="module n-pane fog round" style="width: 260px; height: 120px;">
	<div class="desc" style="height:70px;">Moon of Earth is Lunar. Lunar maria or oceani: Sea of Cold, Sea of Clouds, Sea of Waves, Serpent Sea, Sea of Cleverness.</div>

	<button class="btn-close btn btn-default btn-xs">close</button>
</div>
