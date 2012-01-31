(function ($) {

	$.widget("ui.widgeto", {

		getLevel: function () { return this.options.level; },
		setLevel: function (x) {
			var greenlevels = this.options.greenlevels;
			var level = Math.floor(Math.min(greenlevels.length-1, Math.max(0,x)));
			this.options.level = level;
			this.element.css({background: greenlevels[level]});
			this._trigger('change', 0, level);
		},
		_init: function() { this.setLevel(this.getLevel()); }, // grab the default value and use it
		darker: function() { this.setLevel(this.getLevel()-1); },
		lighter: function() { this.setLevel(this.getLevel()+1); },
		off: function() {
			this.element.css({background: 'none'});
			this._trigger('done');
			this.destroy(); // use the predefined function
		},
		options: {
			level: 15,
			greenlevels: ['#000','#010','#020','#030','#040','#050','#060','#070','#080','#090','#0a0','#0b0','#0c0','#0d0','#0e0','#0f0', '#fff']
		}

	});

})(jQuery);