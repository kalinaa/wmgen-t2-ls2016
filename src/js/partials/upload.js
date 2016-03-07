;(function () {
    'use strict';
    var mainImg      = $('#main-img-input'),
        watermark    = $('#watermark-input'),
        url          = '../server/php/',
        disabledNode = $('.disabled'),
        workAreaWidth = $('.result__block').width(),
        workAreaHeight = $('.result__block').height(),
        widthMainImg,
        heightMainImg;
    mainImg.fileupload({
        thumbnail:false,
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
            $.post(
                '../server/php/getsize.php',
                {
                    url: data.result.files[0].url
                },
                function(answer){
                    var param = $.parseJSON(answer);
                    getImgScale(param);
                }
            );

        },
        //включение анимации прогресса при загрузку тяжелых файлов
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            if (progress != 100) {
                console.log(progress);
            }
        }
    });

    var getImgScale = function (param){
        widthMainImg = param.width;
        heightMainImg = param.height;
        var widthScale = workAreaWidth/widthMainImg,
            heightScale = workAreaHeight/heightMainImg;
        if (widthScale < 1 && heightScale <1 && widthScale >= heightScale){
            imgSettings.generalScale = widthScale;
        } else if (widthScale < 1 && heightScale <1 && widthScale < heightScale){
            imgSettings.generalScale = heightScale;
        } else {
            imgSettings.generalScale = 1;
        }
    };

    watermark.fileupload({
        url: url,
        dataType: 'json',
        thumbnail: false,
        done: function (e, data) {
            $.post(
                '../server/php/getsize.php',
                {
                    url: data.result.files[0].url
                },
                function(answer){
                    var param       = $.parseJSON(answer),
                        maxWidth    = param.width * imgSettings.generalScale;
                    $('#watermark').attr({'src' : data.result.files[0].url,  style : 'max-width:' + maxWidth + 'px'});
                }
            );
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
}());