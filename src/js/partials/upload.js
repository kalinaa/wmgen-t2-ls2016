;(function () {
    'use strict';
    var mainImg      = $('#main-img-input'),
        watermark    = $('#watermark-input'),
        url          = '../server/php/',
        disabledNode = $('.disabled'),
        workAreaWidth = $('.result__block').width(),
        workAreaHeight = $('.result__block').height(),
        downloadPopup = $('.download-popup'),
        widthMainImg,
        heightMainImg,
        noScaleWidthWM,
        widthWM,
        heightWM,
        maxWidthWM;

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
            }
        },
        url: url,
        dataType: 'json',
        done: function (e, data) {
            $('#main-img-input').siblings('.file-name').text(data.result.files[0].name);   // подстановка имени файла в инпуты
            $('#watermark-input').siblings('.file-name').text('');
            $('#main-img').attr('src', data.result.files[0].url).show();   // передача адреса картинки в канву
            $('#watermark').removeAttr('src').hide();
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

            $('#main-img').load(function(){
                if(widthMainImg && heightMainImg && widthWM && heightWM){
                    if (widthWM > widthMainImg || heightWM > heightMainImg){
                        imgSettings.containment = false;
                    } else {
                        imgSettings.containment = 'parent';
                    }
                    console.log(imgSettings.containment);
                }
            });
            downloadPopup.hide();
        },
        //включение анимации прогресса при загрузку тяжелых файлов
        progress: function () {
            downloadPopup.show();
        }
    });

    var getImgScale = function (param){
        widthMainImg = param.width;
        heightMainImg = param.height;
        var widthScale = workAreaWidth/widthMainImg,
            heightScale = workAreaHeight/heightMainImg;
        if (widthScale < 1 && heightScale < 1 && widthScale <= heightScale){
            imgSettings.generalScale = widthScale;
        } else if (widthScale < 1 && heightScale < 1 && widthScale > heightScale){
            imgSettings.generalScale = heightScale;
        } else {
            imgSettings.generalScale = 1;
        }
    };

    var getMaxWidthWM = function (){
        maxWidthWM = noScaleWidthWM * imgSettings.generalScale;
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
                    var param = $.parseJSON(answer);
                    noScaleWidthWM = param.width;
                    getMaxWidthWM();
                    $('#watermark').attr({'src' : data.result.files[0].url,  style : 'max-width:' + maxWidthWM + 'px'}).show();
                }
            );
            $('#watermark-input').siblings('.file-name').text(data.result.files[0].name);
            $('#watermark').load(function(){
                var $this = $(this);

                widthWM = $this.width();
                heightWM = $this.height();
                if(widthMainImg && heightMainImg && widthWM && heightWM){
                    if (widthWM > widthMainImg || heightWM > heightMainImg){
                        imgSettings.containment = false;
                    } else {
                        imgSettings.containment = 'parent';
                    }
                }
            });


            disabledNode.each(function(){
                $(this).removeClass('disabled');
            });
            downloadPopup.hide();
        },
        //включение анимации прогресса при загрузку тяжелых файлов
        progress: function () {
            downloadPopup.show();
        }
    });
}());