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
                    var valueX = input.val();
                    img.css(position, valueX + 'px' );
                });
            }
            
        };

        return {
            init: init
        }
    })();
    
    position.init();