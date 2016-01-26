&nbsp;
<script type="text/javascript">
    global.module1 = function(el){
        el.appendChild(document.getElementById('module1_tpl'));

        document.querySelector('#module1_tpl b').innerHTML = 'Luna';
    };
</script>

<div id="module1_tpl">
    Moon of Earth is <span><b>...</b></span>.
</div>
