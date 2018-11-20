function Popup (pop, name) {
	this.$pop = $(pop);
	this.name = name;
	this.$close = this.$pop.find('.popup__close');
	if (this.$pop.attr('data-pos') === 'y') this.setPosition();
	this.init();
}

Popup.instances = {};
Popup.opened = 0;
Popup.getInstance = function(name, pop) {
	if(Popup.instances[name]) return Popup.instances[name];
	if (pop) return new Popup(pop, name);
	return false;
}
Popup.hideAll = function() {
	for (var popup in Popup.instances) {
		Popup.instances[popup].hide();
	}
	Popup.mask.fadeOut('fast');
}

Popup.prototype.init = function() {
	if (!Popup.mask) {
		this.initMask();
	}
	Popup.instances[this.name] = this;
	this.$pop.on('click', function(e) {e.stopPropagation();});
	this.$pop.on('click','.popup__close', this.hide.bind(this));
}

Popup.prototype.initMask = function() {
	var that = this;
	var mask = $(document).find('#mask');
	if (mask.length == 0) return;
	Popup.mask = mask;

	Popup.mask.on('click', function() {
		Popup.hideAll();
	});

	$(document).keyup(function(event) {
		if (event.keyCode == 27) {
			Popup.hideAll();	
		}
	});
};

Popup.prototype.showMask = function() {
	if (!Popup.mask) return;
	Popup.mask.fadeIn(400);
}

Popup.prototype.hideMask = function() {
	if (!Popup.mask) return;
	Popup.mask.fadeOut('fast');
}

Popup.prototype.setPosition = function() {
	var w = this.$pop.innerWidth();
	var h = this.$pop.height();
	this.$pop.css({
		'top'     : '50%',
		'left' : '50%',
		'transform': 'translate(-50%, -50%)'
	});
};

Popup.prototype.show = function() {
	$('body').css('overflow', 'hidden');
	this.showMask();
	this.$pop.removeClass('hidden').addClass('shown');
	Popup.opened++;
};

Popup.prototype.hide = function() {
	this.$pop.removeClass('shown').addClass('hidden');
	if (--Popup.opened <= 0) {
		Popup.opended = 0;
		this.hideMask();
		$('body').css('overflow', 'visible');	
	}
};