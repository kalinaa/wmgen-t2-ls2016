;(function() {
    $('.disabled').on('click', function(){
        var label   = $('.file-name');

        label.each(function(ndx, elem){
            if ($(elem).html() == '' && $(elem).parent().siblings('.disabled').length == 0){
                console.log(elem);
                $(elem).parent().siblings('.download__tooltip').show();
            }
        });
    });
}());