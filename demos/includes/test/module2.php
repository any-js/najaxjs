&nbsp;
<script type="text/javascript">
    global.module2 = function(el){
        el.appendChild(document.getElementById('module2_tpl'));

        var txt = el.querySelector('.desc').innerHTML;

        var i=0;
        setInterval(function(){
            i++;
            el.querySelector('.desc').innerHTML = txt.substr(0, i);
        }, 60);
    };
</script>

<div id="module2_tpl" style="width: 260px; height: 80px;">
    <div class="desc" style="height:70px;">Moon of Earth is Lunar. Lunar maria or ocean: Sea of Cold, Sea of Clouds, Sea of Waves, Serpent Sea, Sea of Cleverness.
    </div>
</div>
