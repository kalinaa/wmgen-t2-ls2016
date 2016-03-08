
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
            tooltip     : "Upload image",
            error__modal: "Oops! Server don’t respond… Sorry, I ate it!!!",
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
            error__modal: "Кажется, сервер не отвечает... простите, но я его съела !!!",
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
