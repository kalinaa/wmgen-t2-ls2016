var position = (function () {
        var init = function () {
            _setUpListners();
        };

        var _setUpListners = function () {

            $('.watermark-link').on('click', function (e) {
                e.preventDefault();
                var pos = $(this).data("pos");

                $('.img_small').position({
                    my: pos,  // место на позиционируемом элементе
                    at: pos,  // место на элементе относительно которого будет позиционирование
                    collision: 'none none',
                    of: '.img_big' // элемент относительно которого будет позиционирование
                });

                //поиск и вывод координатов водяного знака
                
                var top = Math.round($('.img_small').offset().top).toFixed(0) - Math.round($('.img_big').offset().top).toFixed(0);
                var left = Math.round($('.img_small').offset().left).toFixed(0) - Math.round($('.img_big').offset().left).toFixed(0);

                $('.input_x').val(left);
                $('.input_y').val(top);
            });
            
            //задает положение через ввод данных в input по оси Х
            inputXY ($('.input_x'), $('.img_small'), 'left');
            
            //задает положение через ввод данных в input по оси Y
            inputXY ($('.input_y'), $('.img_small'), 'top');
            
            function inputXY (input, img, position) {
                input.on('keyup', function () {
                    var value = input.val();
                    img.css(position, value + 'px' );
                });
            }
            
            //ввод позиции через кнопки вверх, вниз
            $('.top_x').on('click', function (e) {
                e.preventDefault();
                var valueX = $('.input_x').val();
                var newValueX = +valueX + 1;
                $('.input_x').val(newValueX);
                $('.img_small').css('left', newValueX + 'px' );
            });
             $('.bottom_x').on('click', function (e) {
                e.preventDefault();
                var valueX = $('.input_x').val();
                var newValueX = +valueX - 1;
                $('.input_x').val(newValueX);
                $('.img_small').css('left', newValueX + 'px' );
            });
            $('.top_y').on('click', function (e) {
                e.preventDefault();
                var valueY = $('.input_y').val();
                var newValueY = +valueY + 1;
                $('.input_y').val(newValueY);
                $('.img_small').css('top', newValueY + 'px' );
            });
             $('.bottom_y').on('click', function (e) {
                e.preventDefault();
                var valueY = $('.input_y').val();
                var newValueY = +valueY - 1;
                $('.input_y').val(newValueY);
                $('.img_small').css('top', newValueY + 'px' );
            });
        };

        return {
            init: init
        }
    })();
    
    position.init();