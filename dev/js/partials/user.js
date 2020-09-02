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
});
