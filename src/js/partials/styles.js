;(function(){

    $('.position__first').on('click', function(e){
        e.preventDefault();

        $('.position__watermark-one').removeClass('hide');
        $('.position__watermark-second').addClass('hide');
    });

    $('.position__second').on('click', function(e){
        e.preventDefault();

        $('.position__watermark-second').removeClass('hide');
        $('.position__watermark-one').addClass('hide');
    });

    Share = {
        vkontakte: function(purl, ptitle, pimg, text) {
            url  = 'http://vkontakte.ru/share.php?';
            url += 'url='          + encodeURIComponent(purl);
            url += '&title='       + encodeURIComponent(ptitle);
            url += '&description=' + encodeURIComponent(text);
            url += '&image='       + encodeURIComponent(pimg);
            url += '&noparse=true';
            Share.popup(url);
        },
        facebook: function(purl, ptitle, pimg, text) {
            url  = 'http://www.facebook.com/sharer.php?s=100';
            url += '&p[title]='     + encodeURIComponent(ptitle);
            url += '&p[summary]='   + encodeURIComponent(text);
            url += '&p[url]='       + encodeURIComponent(purl);
            url += '&p[images][0]=' + encodeURIComponent(pimg);
            Share.popup(url);
        },
        twitter: function(purl, ptitle) {
            url  = 'http://twitter.com/share?';
            url += 'text='      + encodeURIComponent(ptitle);
            url += '&url='      + encodeURIComponent(purl);
            url += '&counturl=' + encodeURIComponent(purl);
            Share.popup(url);
        },

        popup: function(url) {
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
        }
    };

}());
