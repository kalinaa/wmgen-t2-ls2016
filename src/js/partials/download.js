;(function(){
    // поклику на disable показывать тултипы
    $('#download-btn').on('click',  function(e){
        e.preventDefault();
        $.ajax({
            type        : 'post',
            url         : '../server/php/download.php',
            data        : .5,
            success     : function(answer){
                var param = $.parseJSON(answer),
                    link = document.getElementById('hidden-link');
                link.setAttribute('href', param.url);
                link.setAttribute('download','marked');
                if (param.flag){
                    link.click();
                } else {
                    $('#server-error').show().children('#error-block').slideDown();
                }
            },
            error       : function(){
                $('#server-error').show().children('#error-block').slideDown();
            }
        })
    });
    // Закрытие модального окна
    var closeError = function(e){
        $('#server-error').hide().children('#error-block').hide();
    };
    $('#close-error').on('click', function(e){
        e.preventDefault();
        closeError();
    });
    $('body').on('click', function(e){
        if($(e.target).closest("#error-block").length==0){
            closeError();
        }
    });
}());