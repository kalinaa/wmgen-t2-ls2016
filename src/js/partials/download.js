;(function(){
    $('#download-btn').on('click',  function(e){
        e.preventDefault();
        $.post(
            '../server/php/download.php',
            {
                opacity: .5
            },
            function() {
                var link = document.getElementById('hidden-link');
                link.setAttribute('href','../server/php/files/marked/marked.jpg');
                link.setAttribute('download','marked');
                link.click();
            }
        )
    })
}());