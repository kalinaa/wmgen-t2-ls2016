;(function(){
    var ruBtn           = $('#rus'),
        enBtn           = $('#eng'),
        headerTitle     = $('#header-title'),
        english         = {
            header      : "Watermarks generator",
            setting     : "Settings",
            mainImg     : "Original image",
            waterM      : "Watermark",
            position    : "Place",
            opacity     : "Transparency",
            reset       : "Reset",
            download    : "Download",
            copy        : "&copy; 2016, This is my website, please do not copy or steal it."
        },
        russian         = {
            header      : "Генератор подяных знаков",
            setting     : "Настройки",
            mainImg     : "Исходное изображение",
            waterM      : "Водяной знак",
            position    : "Положени",
            opacity     : "Прозрачность",
            reset       : "Сброс",
            download    : "Скачать",
            copy        : "&copy; 2016, Это мой сайт, пожалуйста, не копируйте и не воруйте его."
        },
        currentLang     = 'ru';
    ruBtn.on('click', function(){
       if (currentLang !='ru'){
           $(this).addClass('active').siblings().removeClass('active');

           currentLang = 'ru';
       }
    });
}());