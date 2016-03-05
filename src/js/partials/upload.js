;$(function () {
    'use strict';
    var mainImg     = $('#main-img-input'),
        watermark   = $('#watermark-input'),
        url         = '../server/php/';
    mainImg.fileupload({
        url: url,
        dataType: 'json',
        maxFileSize: 1000000,
        done: function (e, data) {
            var fileType = data.result.files[0].type,
                fileExt = fileType.substring(fileType.lastIndexOf('/')+1, fileType.length);
            $('#main-img-input').siblings('.file-name').text(data.result.files[0].name);   // подстановка имени файла в инпуты
            $('#main-img').attr('src', data.result.files[0].url);   // передача адреса картинки в канву
            if ($('#watermark-input').prop('disabled')){
                $('#watermark-input').prop('disabled', false);     // разблокировка второго input
                $('#watermark-input').parent().removeClass('disabled');
            };
            console.log(data.result.files[0].type);
            console.log(fileExt);
        },
        //включение анимации прогресса при загрузку тяжелых файлов
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            if (progress != 100) {
                console.log(progress);
            }
        }
    });
    //watermark.fileupload({
    //    url: url,
    //    dataType: 'json',
    //    done: function (e, data) {
    //        var fileType = data.result.files[0].type,
    //            fileExt = fileType.substring(fileType.lastIndexOf('/')+1, fileType.length);
    //        $('#watermark-input').siblings('.file-name').text(data.result.files[0].name);
    //        $('#watermark').attr('src', data.result.files[0].url);
    //        console.log(data.result.files[0].type);
    //        console.log(fileExt);
    //    },
    //    //включение анимации прогресса при загрузку тяжелых файлов
    //    progress: function (e, data) {
    //        var progress = parseInt(data.loaded / data.total * 100, 10);
    //        if (progress != 100) {
    //            console.log(progress);
    //        }
    //    }
    //})

    //mainImg.change(function() {
    //    if (this.files[0].size < 1000000) {
});