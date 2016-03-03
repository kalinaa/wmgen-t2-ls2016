;$(function () {
    'use strict';
    var mainImg     = $('#main-img-input'),
        watermark   = $('#watermark-input'),
        url         = '../server/php/';
    mainImg.fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            var fileType = data.result.files[0].type,
                fileExt = fileType.substring(fileType.lastIndexOf('/')+1, fileType.length);
            $('#main-img-input').siblings('.file-name').text(data.result.files[0].name);
            $('#main-img').attr('src', data.result.files[0].url);
            console.log(data.result.files[0].type);
            console.log(fileExt);
        },
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
            var fileType = data.result.files[0].type,
                fileExt = fileType.substring(fileType.lastIndexOf('/')+1, fileType.length);
            $('#watermark-input').siblings('.file-name').text(data.result.files[0].name);
            $('#watermark').attr('src', data.result.files[0].url);
            console.log(data.result.files[0].type);
            console.log(fileExt);
        },
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            if (progress != 100) {
                console.log(progress);
            }
        }
    })
});