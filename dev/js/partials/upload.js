'use strict';
let uploadURL = 'https://some-site.ru/upload',
	maxSize = 10,
	allowExt = [
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/pdf',
		'image/jpeg',
		'application/zip'
	],
	isProd = false;

function UploadFile(form, afterUpload) {
	let obj = this;

	this.form = form;

	this.dropInit = function (dropzoneId) {
		obj.dropzone = {
			js: document.getElementById(dropzoneId),
			jquery: $('#' + dropzoneId)
		};
		if (obj.dropzone.js) {
			obj.dropzone.js.ondragover = function () {
				return false;
			};
			obj.dropzone.js.ondragleave = function () {
				return false;
			};
			obj.dropzone.js.ondrop = function (event) {
				event.preventDefault();
				obj.upload( event.dataTransfer.files);
			};
		}
	};

	this.validate = function(file) {
		/* Валидация изображения на клиенте */
		if (file.name.length > 255) {
			return 'Слишком длинное имя файла';
		}
		if (file.size > maxSize * 1024 * 1024) {
			return 'Файл должен быть не более ' + maxSize + ' мб';
		}
		if (allowExt.indexOf(file.type) === -1) {
			return 'Файл должен быть в формате doc, docx, pdf, jpg, zip';
		}
		return true;
	};

	this.checkFiles = function(files) {
		for (let idx=0; idx < files.length; idx++) {
			let isValid = this.validate(files[idx]);
			if (isValid !== true) {
				return isValid;
			}
		}
		return true;
	};

	if (isProd) {
		this.upload = function (files) {
			var $form = $('#' + obj.form),
				$error = $form.find('.error'),
				$progressBar = $form.find('.drag-drop__loading'),
				$progress = $form.find('.drag-drop__progress');
			$error.hide();

			let isValid = this.checkFiles(files);
			if (isValid !== true) {
				$error.show().text(isValid);
				return;
			}

			/* Загрузка файла по ajax */
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener('progress', function (event) {
				let percent = parseInt(event.loaded / event.total * 100);
				$progress.val(percent);
			}, false);

			xhr.onreadystatechange = function () {
				$progressBar.hide();
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						var result = JSON.parse(xhr.responseText);
						if (result.status === 'success') {
							if (afterUpload && typeof afterUpload == 'function') {
								afterUpload(files);
							}
						} else {
							$error.show().text(result.message);
						}
					} else {
						$error.show().text('Произошла ошибка отправки файла');
					}
				}
			};
			xhr.open('POST', uploadURL);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			let data = new FormData();
			for (let idx=0; idx < files.length; idx++) {
				data.append('file[' + idx +']', files[idx]);
			}
			data.append('size', maxSize);

			$progressBar.show();
			xhr.send(data);
		};
	} else {
		// Т
		this.upload = function (files) {
			var $form = $('#' + obj.form),
				$error = $form.find('.error'),
				$progressBar = $form.find('.drag-drop__loading'),
				$progress = $form.find('.drag-drop__progress');
			$error.hide();

			let isValid = this.checkFiles(files);
			if (isValid !== true) {
				$error.show().text(isValid);
				return;
			}

			$progress.val(30);
			$progressBar.show();
			setTimeout(function () {
				$progress.val(60);
				setTimeout(function () {
					$progressBar.hide();
					if (afterUpload && typeof afterUpload == 'function') {
						afterUpload(files);
					}
				}, 500);
			}, 200);
		};
	}
}
