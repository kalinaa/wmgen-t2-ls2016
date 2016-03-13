;(function(){
    var downloadPopup = $('.download-popup');
    // по клику на disable показывать тултипы
    $('#settings-form').on('submit',  function(e){
        e.preventDefault();
        $.ajax({
            type        : 'post',
            url         : '../server/php/getimage.php',
            data        : $('#settings-form').serialize() + '&' + $.param(imgSettings),
            timeout     : 30000,
            beforeSend  : function(){
                downloadPopup.show();
            },
            success     : function(answer){
                var param = $.parseJSON(answer);
                console.log (param);
                if (param.resultscs){
                    downloadPopup.hide();
                    $('body').append('<iframe src="server/php/download.php" class="frame"></iframe>');
                } else {
                    downloadPopup.hide();
                    $('#server-error').show().children('.server__error-main').slideDown();
                }
            },
            error       : function(){
                downloadPopup.hide();
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