;$(function () {
    'use strict';
    var mainImg      = $('#main-img-input'),
        watermark    = $('#watermark-input'),
        url          = '../server/php/',
        disabledNode = $('.disabled');
    mainImg.fileupload({
        add: function(e, data) {
            var uploadErrors = [];
            var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
            if(!acceptFileTypes.test(data.originalFiles[0].type)) {
                uploadErrors.push('Загрузите картинку');
            }
            if(data.originalFiles[0].size > 2000000) {
                uploadErrors.push('Файл слишком большой');
            }
            if(uploadErrors.length > 0) {
                alert(uploadErrors.join("\n"));
            } else {
                data.submit();
                console.log('Файл загружен')
            }
        },
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $('#main-img-input').siblings('.file-name').text(data.result.files[0].name);   // подстановка имени файла в инпуты
            $('#main-img').attr('src', data.result.files[0].url);   // передача адреса картинки в канву
            if ($('#watermark-input').prop('disabled')){
                $('#watermark-input').prop('disabled', false);     // разблокировка второго input
                $('#watermark-wrap').children('.disabled').removeClass('disabled');
            }
        },
        //включение анимации прогресса при загрузку тяжелых файлов
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            if (progress != 100) {
                console.log(progress);
            }
        }
    });
    watermark.fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $('#watermark-input').siblings('.file-name').text(data.result.files[0].name);
            $('#watermark').attr('src', data.result.files[0].url);
            disabledNode.each(function(){
                $(this).removeClass('disabled');
            });
        },
        //включение анимации прогресса при загрузку тяжелых файлов
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            if (progress != 100) {
                console.log(progress);
            }
        }
    });
});