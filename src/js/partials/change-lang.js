
    var ruBtn           = $('#rus'),
        enBtn           = $('#eng'),
        selection = {
            en:{
            header      : "Watermarks generator",
            setting     : "Settings",
            mainImg     : "Original image",
            waterM      : "Watermark",
            position    : "Place",
            opacity     : "Transparency",
            reset       : "Reset",
            download    : "Download",
            error__modal: "Oops! Server don’t respond… Sorry, I ate it!!!",
            errorsize__modal : "The file is too large. Please, upload file is not more than 2mb!",
            errorext__modal : "Please, upload image with extension .jpeg, .jpg, .png, .gif!",
            tooltip     : "Upload image",
            copy        : "&copy; 2016, This is my website, please do not copy or steal it."
            },

            rus: {
            header      : "Генератор подяных знаков",
            setting     : "Настройки",
            mainImg     : "Исходное изображение",
            waterM      : "Водяной знак",
            position    : "Положение",
            opacity     : "Прозрачность",
            reset       : "Сброс",
            download    : "Скачать",
            error__modal: "Кажется, cервер не отвечает... простите, но я его съела !!!",
            errorsize__modal : "Файл слишном большой. Пожалуйста загрузите файл не более 2мб!",
            errorext__modal : "Пожалуйста, загрузите изображение .jpeg, .jpg, .png, .gif!",
            tooltip     : "Загрузите изображение",
            copy        : "&copy; 2016, Это мой сайт, пожалуйста, не копируйте и не воруйте его."
            }

        };

        $translate = function(selection, lang){

            $('[data-translate]').each(function(){
                $(this).html( selection[ lang ][ $(this).data('translate') ] );
            });

        };

$(function(){
    $(enBtn).click(function(event) {
    $translate(selection, 'en');
    $(ruBtn).removeClass('active');
    $(enBtn).addClass('active');
});
$(ruBtn).click(function(event) {
    $translate(selection, 'rus');
    $(enBtn).removeClass('active');
    $(ruBtn).addClass('active');
    });
});
$( document ).ready(function() {
    $(enBtn).removeClass('active');
    $(ruBtn).addClass('active');
});
