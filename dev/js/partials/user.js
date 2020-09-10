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
	$(document).on('click', function(ev){
		if ($(ev.target).parents('.header__drop').length === 0) {
			$('.phone-drop').removeClass('phone-drop_open');
		}
	});

	$('input[type="tel"]').mask("+7(999)999-99-99");

	let $container = $('.drag-drop__loaded');

	function fileUploadedDelete($self) {
		$self.remove();
		if ($container.children().length === 0) {
			$container.hide();
		}
	}

	function fileUploaded(files) {
		let $tpl = $('#drag-drop-file-tpl').html();
		for (let idx=0; idx < files.length; idx++) {
			let size = (files[idx].size / (1024 * 1024)).toFixed(2),
				$file = $($tpl.replace(/__fileName__/g, files[idx].name)
					.replace(/__size__/g, size + ' МБ')
					.replace(/__ext__/g, files[idx].name.split('.').pop()));

			$file.appendTo($container);

			$file.find('.drag-drop__remove').on('click', function () {
				fileUploadedDelete($file);
			});
		}
		$container.css('display','flex');
	}

	let $uploadFile = new UploadFile('upload', fileUploaded);
	$uploadFile.dropInit('drag-drop');
	$('.drag-drop__file').on('change', function () {
		$uploadFile.upload(this.files);
	});

	$('body').magnificPopup({
		delegate: '.js-popup',
		fixedBgPos: true,
		fixedContentPos: true,
		mainClass: 'mfp-fade',
		midClick: true,
		overflowY: 'auto',
		preloader: false,
		removalDelay: 300,
		type: 'inline',
	});

	$('.prod-tabs').on('click', '.prod-tabs__item:not(.prod-tabs__item_active)', function() {
		$(this).addClass('prod-tabs__item_active').siblings().removeClass('prod-tabs__item_active')
			.closest('.prod-tabs').find('.prod-tabs-content__item').removeClass('prod-tabs-content__item_active').eq($(this).index()).addClass('prod-tabs-content__item_active');
	});

	$('.slider_company').slick({
		cssEase: 'linear',
		fade: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		touchThreshold: 15,
		nextArrow: '<button type="button" class="slick-next"><svg class="svg"><use xlink:href="img/svgSprite.svg#icon__arrow_right"></use></svg></button>',
		prevArrow: '<button type="button" class="slick-prev"><svg class="svg"><use xlink:href="img/svgSprite.svg#icon__arrow_left"></use></svg></button>'
	});

	$('.slider_production').slick({
		asNavFor: '.slider_production_mini',
		cssEase: 'linear',
		fade: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		touchThreshold: 15,
		nextArrow: '<button type="button" class="slick-next"><svg class="svg"><use xlink:href="img/svgSprite.svg#icon__arrow_right"></use></svg></button>',
		prevArrow: '<button type="button" class="slick-prev"><svg class="svg"><use xlink:href="img/svgSprite.svg#icon__arrow_left"></use></svg></button>'
	});
	$('.slider_production_mini').slick({
		arrows: false,
		asNavFor: '.slider_production',
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.slider_about').slick({
		asNavFor: '.slider_about_mini',
		cssEase: 'linear',
		fade: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		touchThreshold: 15,
		nextArrow: '<button type="button" class="slick-next"><svg class="svg"><use xlink:href="img/svgSprite.svg#icon__arrow_right"></use></svg></button>',
		prevArrow: '<button type="button" class="slick-prev"><svg class="svg"><use xlink:href="img/svgSprite.svg#icon__arrow_left"></use></svg></button>'
	});
	$('.slider_about_mini').slick({
		adaptiveHeight: true,
		arrows: false,
		asNavFor: '.slider_about',
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.slider_lab').slick({
		asNavFor: '.slider_lab_mini',
		cssEase: 'linear',
		fade: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		touchThreshold: 15,
		nextArrow: '<button type="button" class="slick-next"><svg class="svg"><use xlink:href="img/svgSprite.svg#icon__arrow_right"></use></svg></button>',
		prevArrow: '<button type="button" class="slick-prev"><svg class="svg"><use xlink:href="img/svgSprite.svg#icon__arrow_left"></use></svg></button>'
	});
	$('.slider_lab_mini').slick({
		adaptiveHeight: true,
		arrows: false,
		asNavFor: '.slider_lab',
		fade: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$("a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			let hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function(){
				window.location.hash = hash;
			});
		}
	});
});
