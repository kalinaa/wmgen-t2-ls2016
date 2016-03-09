;(function(){

    $('.position__first').on('click', function(e){
        e.preventDefault();
        
        $('.position__watermark-second').removeClass('hide');
        $('.position__watermark-one').addClass('hide');
        $(this).addClass('position__first--active');
        $('.position__second').removeClass('position__second--active');
    });

    $('.position__second').on('click', function(e){
        e.preventDefault();

        $('.position__watermark-one').removeClass('hide');
        $('.position__watermark-second').addClass('hide');
        $(this).addClass('position__second--active');
        $('.position__first').removeClass('position__first--active');
    });


    $(document).on('click', '.social_share', function(){
        Share.go(this);
    });
    Share = {
        go: function(_element, _options) {
            var
                self = Share,
                options = $.extend(
                    {
                        type:       'vk',
                        url:        location.href,
                        count_url:  location.href,
                        title:      document.title,
                        image:        '',
                        text:       ''
                    },
                    $(_element).data(),
                    _options
                );

            if (self.popup(link = self[options.type](options)) === null) {
                if ( $(_element).is('a') ) {
                    $(_element).prop('href', link);
                    return true;
                }
                else {
                    location.href = link;
                    return false;
                }
            }
            else {
                return false;
            }
        },


        vk: function(_options) {
            var options = $.extend({
                url:    location.href,
                title:  document.title,
                image:  '',
                text:   ''
            }, _options);

            return 'http://vkontakte.ru/share.php?'
                + 'url='          + encodeURIComponent(options.url)
                + '&title='       + encodeURIComponent(options.title)
                + '&description=' + encodeURIComponent(options.text)
                + '&image='       + encodeURIComponent(options.image)
                + '&noparse=true';
        },

        fb: function(_options) {
            var options = $.extend({
                url:    location.href,
                title:  document.title,
                image:  '',
                text:   ''
            }, _options);

            return 'http://www.facebook.com/sharer.php?s=100'
                + '&p[title]='     + encodeURIComponent(options.title)
                + '&p[summary]='   + encodeURIComponent(options.text)
                + '&p[url]='       + encodeURIComponent(options.url)
                + '&p[images][0]=' + encodeURIComponent(options.image);
        },

        tw: function(_options) {
            var options = $.extend({
                url:        location.href,
                count_url:  location.href,
                title:      document.title,
            }, _options);

            return 'http://twitter.com/share?'
                + 'text='      + encodeURIComponent(options.title)
                + '&url='      + encodeURIComponent(options.url)
                + '&counturl=' + encodeURIComponent(options.count_url);
        },

        popup: function(url) {
            return window.open(url,'','toolbar=0,status=0,scrollbars=1,width=626,height=436');
        }
    };

}());
