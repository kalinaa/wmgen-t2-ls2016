;(function(){
    var ruBtn           = $('#rus'),
        enBtn           = $('#eng'),
        //headerTitle     = $('#header-title'),
        //settings        = $('#settings'),
        elementToTranslate = {
            headerTitle : $('#header-title'),
            settings : $('#settings')
        },
        english         = {
            headerTitle      : "Watermarks generator",
            settings     : "Settings",
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

    ruBtn.on('click', function(e){
        e.preventDefault();
        if (currentLang =='ru'){
           ruBtn.addClass('active-lang').siblings().removeClass('active-lang');
           //for (var key in elementToTranslate) {
           //     console.log(key)
           //};
           currentLang = 'ru';
       }
    });
}());