$any.defineClass({
   'Star.Sun': function(mk){
      return mk(function(){
         this._sun = 'Sun.';
         this._detail = 'Prominences / Corona / Solar wind';
      }, {
         layout: function(el){
            $(el).html(this._sun + ' ' + this._detail);
         }
      });
   },
   'Planet.Venus': function(mk){
      return mk(function(){
         this._venus = 'Venus.';
         this._detail = 'Volcano / CO2 / Sulfuric acid';
      }, {
         layout: function(el){
            $(el).html(this._venus + ' ' + this._detail);
         }
      });
   }
}, null, true);
