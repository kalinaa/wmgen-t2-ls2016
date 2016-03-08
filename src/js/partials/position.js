/* global $ */


var position = (function () {


        var init = function () {
            _setUpListners();
            //_changePositionDrag();
        };



            // Смена координат с помощью мыши
        var _changePositionDrag = function() {
            var image = $('.img_small'),
                info;

            image.draggable({
                cursor: 'move',
                containment: imgSettings.containment,
                drag: function(event, ui) {
                    x = $('.img_big').width();
                    y = $('.img_big').height();

                    ui.position.left / 2;
                    ui.position.top / 2;

                    $('.watermark-link').removeClass('watermark-link--active');
                    //Запись координатов с Draggable в input
                    var left = Math.round(ui.position.left).toFixed(0);
                    var top = Math.round(ui.position.top).toFixed(0);
                    $('.input_x').val(left);
                    $('.input_y').val(top);
                    }
                });
        };

        var _setUpListners = function () {
            $('.img_small').on('mouseenter', _changePositionDrag);
            $('.watermark-link').on('click', function (e) {
                e.preventDefault();
                $('.watermark-link').removeClass('watermark-link--active');
                $(this).addClass('watermark-link--active');
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
            inputXY ($('.input_x'), $('.img_small'), 'left', 'x');

            //задает положение через ввод данных в input по оси Y
            inputXY ($('.input_y'), $('.img_small'), 'top', 'y');

            function inputXY (input, img, position, axis) {
                input.on('keyup', function () {
                    $('.watermark-link').removeClass('watermark-link--active');
                    var value = input.val();
                    if(axis == 'x'){
                        var maxValueX = $('.img_big').width() - $('.img_small').width();
                        if(value >= maxValueX){
                            value = maxValueX;
                            input.val(maxValueX);
                        }
                        else if(value < 0){
                            value = 0;
                            input.val(0);
                        }
                    }
                    if(axis == 'y'){
                        var maxValueY = $('.img_big').height() - $('.img_small').height();
                        if(value >= maxValueY){
                            value = maxValueY;
                            input.val(maxValueY);
                        }
                        else if(value < 0){
                            value = 0;
                            input.val(0);
                        }
                    }
                    img.css(position, value + 'px' );
                });
            }

            //ввод позиции через кнопки вверх, вниз
            buttons($('.top_x'), $('.input_x'), 'left', "+", 'x' );
            buttons($('.bottom_x'), $('.input_x'), 'left', "-", 'x' );
            buttons($('.top_y'), $('.input_y'), 'top', "+", 'y' );
            buttons($('.bottom_y'), $('.input_y'), 'top', "-", 'y' );

            function buttons (object, input, position, math, axis){
                object.on('click', function (e) {
                    e.preventDefault();
                    $('.watermark-link').removeClass('watermark-link--active');
                    var value = input.val();
                    var newValue;

                    if(math == '+'){
                        if(axis == 'x'){
                            var maxValueX = $('.img_big').width() - $('.img_small').width();
                            if(value >= maxValueX){
                                newValue = maxValueX;
                            }
                            else{
                                newValue = +value + 1;
                            }
                        }
                        else if(axis == 'y'){
                            var maxValueY = $('.img_big').height() - $('.img_small').height();
                            if(value >= maxValueY){
                                newValue = maxValueY;
                            }
                            else{
                                newValue = +value + 1;
                            }
                        }
                    }
                    else if(math == '-'){
                        if(value <= 0){
                            newValue = 0
                        }
                        else{
                            newValue = +value - 1;
                        }
                    }
                    input.val(newValue);
                    $('.img_small').css(position, newValue + 'px' );
                });
            }
        };



        return {
            init: init
        }
    })();

    position.init();