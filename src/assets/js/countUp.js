$.fn.countTo = function (options) {
	options = options || {};

	return $(this).each(function () {
		// set options for current element
		var settings = $.extend({}, $.fn.countTo.defaults, {
			from: $(this).data('from'),
			to: $(this).data('to'),
			speed: $(this).data('speed'),
			refreshInterval: $(this).data('refresh-interval'),
			decimals: $(this).data('decimals')
		}, options);

		// how many times to update the value, and how much to increment the value on each update
		var loops = Math.ceil(settings.speed / settings.refreshInterval),
			increment = (settings.to - settings.from) / loops;

		// references & variables that will change with each update
		var self = this,
			$self = $(this),
			loopCount = 0,
			value = settings.from,
			data = $self.data('countTo') || {};

		$self.data('countTo', data);

		// if an existing interval can be found, clear it first
		if (data.interval) {
			clearInterval(data.interval);
		}
		data.interval = setInterval(updateTimer, settings.refreshInterval);

		// initialize the element with the starting value
		render(value);

		function updateTimer() {
			value += increment;
			loopCount++;

			render(value);

			if (typeof (settings.onUpdate) == 'function') {
				settings.onUpdate.call(self, value);
			}

			if (loopCount >= loops) {
				// remove the interval
				$self.removeData('countTo');
				clearInterval(data.interval);
				value = settings.to;

				if (typeof (settings.onComplete) == 'function') {
					settings.onComplete.call(self, value);
				}
			}
		}

		function render(value) {
			var formattedValue = settings.formatter.call(self, value, settings);
			$self.html(formattedValue);
		}
	});
};

$.fn.countTo.defaults = {
	from: 0,
	to: 0,
	speed: 1000,
	refreshInterval: 100,
	decimals: 0,
	formatter: formatter,
	onUpdate: null,
	onComplete: null
};

function formatter(value, settings) {
	return value.toFixed(settings.decimals);
}

// 璁剧疆鍏朵腑鏌愰」鏁板瓧灏忔暟鐐瑰悗鏄剧ず涓暟
$('.counter').data('countToOptions', {
	formatter: function (value, options) {
		return value.toFixed(2); //灏忔暟鐐瑰悗鏄剧ず1涓� 
	}
});

//鍗冧綅鏁版樉绀�"," 
$('.math').data('countToOptions', {
	formatter: function (value, options) {
		return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
});