;(function(){
    // поклику на disable показывать тултипы
    $('#download-btn').on('click',  function(e){
        e.preventDefault();
        $.post(
            '../server/php/download.php',
            {
                opacity: .5
            },
            function(answer){
                var param = $.parseJSON(answer),
                    link = document.getElementById('hidden-link');
                link.setAttribute('href', param.url);
                link.setAttribute('download','marked');
                if (param.flag){
                    link.click();
                } else {
                    // показать ошибку
                }
            }
        )
    })
}());