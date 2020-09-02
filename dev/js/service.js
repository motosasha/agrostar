'use strict';

$(document).ready(function() {
	$('.service-navigation__trigger').click(function() {
		$(this).parent().toggleClass("service-navigation_open");
	});
});
