;(function(){
    // поклику на disable показывать тултипы
    $('#settings-form').on('submit',  function(e){
        e.preventDefault();
        $.ajax({
            type        : 'post',
            url         : '../server/php/download.php',
            data        : $('#settings-form').serialize() + '&' + $.param(imgSettings),
            success     : function(answer){
                var param = $.parseJSON(answer),
                    link = document.getElementById('hidden-link');
                link.setAttribute('href', param.url);
                link.setAttribute('download','marked');
                if (param.flag){
                    link.click();
                } else {
                    $('#server-error').show().children('.server__error-main').slideDown();
                }
            },
            error       : function(){
                $('#server-error').show().children('.server__error-main').slideDown();
            }
        })
    });
    // Закрытие модального окна
    var closeError = function(e){
        $('.server__error').hide().children('.server__error-main').hide();
    };
    $('.server__error-close').on('click', function(e){
        e.preventDefault();
        closeError();
    });
    $('body').on('click', function(e){
        if($(e.target).closest(".server__error-main").length==0){
            closeError();
        }
    });
}());