;(function () {
    'use strict';
    var mainImg      = $('#main-img-input'),
        watermark    = $('#watermark-input'),
        url = '../server/php/',
        disabledNode = $('.disabled'),
        workAreaWidth = $('.result__block').width(),
        workAreaHeight = $('.result__block').height(),
        downloadPopup = $('.download-popup'),
        noScaleWidthMainImg,
        noScaleHeightMainImg,
        noScaleWidthWM,
        widthMainImg,
        heightMainImg,
        widthWM,
        heightWM,
        maxWidthWM;

    mainImg.fileupload({
        thumbnail:false,
        add: function(e, data) {
            var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
            if(!acceptFileTypes.test(data.originalFiles[0].type)) {
                $('#file-ext-error').show().children('.server__error-main').slideDown();
            }
            else if(data.originalFiles[0].size > 2000000) {
                $('#file-size-error').show().children('.server__error-main').slideDown();
            } else {
                data.submit();
            }
        },
        url: url + '?folder=main',
        dataType: 'json',
        done: function (e, data) {
            $('#main-img-input').siblings('.file-name').text(data.result.files[0].name);   // подстановка имени файла в инпуты
            $('#main-img-input').parent().siblings('.download__tooltip').hide();
            $('#watermark-input').siblings('.file-name').val('');
            $('#watermark-input').siblings('.file-name').text('');
            disabledNode.each(function(){
                $(this).addClass('disabled');
                $('#watermark-input').prop('disabled', true);
            });
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
                    console.log(param);
                    getImgScale(param);
                }
            );

            $('#main-img').load(function(){
                var $this = $(this);

                widthMainImg = $this.width();
                heightMainImg = $this.height();
                if(widthMainImg && heightMainImg && widthWM && heightWM){
                    if (widthWM > widthMainImg || heightWM > heightMainImg){
                        imgSettings.containment = false;
                    } else {
                        imgSettings.containment = 'parent';
                    }
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
        noScaleWidthMainImg = param.width;
        noScaleHeightMainImg = param.height;
        var widthScale = workAreaWidth/noScaleWidthMainImg,
            heightScale = workAreaHeight/noScaleHeightMainImg;
        if (widthScale < 1 || heightScale < 1 && widthScale <= heightScale){
            imgSettings.generalScale = widthScale;
        } else if (widthScale < 1 || heightScale < 1 && widthScale > heightScale){
            imgSettings.generalScale = heightScale;
        } else {
            imgSettings.generalScale = 1;
        }
    };

    var getMaxWidthWM = function (){
        maxWidthWM = noScaleWidthWM * imgSettings.generalScale;
    };

    watermark.fileupload({
        url: url + '?folder=watermark',
        dataType: 'json',
        thumbnail: false,
        add: function(e, data) {
            var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
            if(!acceptFileTypes.test(data.originalFiles[0].type)) {
                $('#file-ext-error').show().children('.server__error-main').slideDown();
            }
            else if(data.originalFiles[0].size > 2000000) {
                $('#file-size-error').show().children('.server__error-main').slideDown();
            } else {
                data.submit();
            }
        },
        done: function (e, data) {
            $.post(
                '../server/php/getsize.php',
                {
                    url: data.result.files[0].url
                },
                function(answer){
                    var param = $.parseJSON(answer);
                    noScaleWidthWM = param.width;
                    console.log(param);
                    getMaxWidthWM();
                    $('#watermark').attr({'src' : data.result.files[0].url,  style : 'max-width:' + maxWidthWM + 'px'}).show();
                }
            );
            $('#watermark-input').siblings('.file-name').text(data.result.files[0].name);
            $('#watermark-input').parent().siblings('.download__tooltip').hide();
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