'use strict';

$(document).ready(function() {
	let $menuTrigger = $('.js-menu-trigger, .page__darker');
	$menuTrigger.click(function () {
		$('body').toggleClass('nav-open')
	});

	let $dropTrigger = $('.js-drop-trigger');
	$dropTrigger.click(function () {
		$('.phone-drop').toggleClass('phone-drop_open')
	});

	$('input[type="tel"]').mask("+7(999)999-99-99");
});
