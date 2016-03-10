/* global $ */


var position = (function () {


        var init = function () {
            _setUpListners();
        };



            // Смена координат с помощью мыши
        var _changePositionDrag = function() {
            var image = $('.container_small-img'),
                info;

            image.draggable({
                cursor: 'move',
                // containment: imgSettings.containment,
                drag: function(event, ui) {
                    x = $('.img_big').width();
                    y = $('.img_big').height();

                    ui.position.left / 2;
                    ui.position.top / 2;

                    $('.watermark-first').removeClass('watermark-link--active');
                    //Запись координатов с Draggable в input
                    var left = Math.round(ui.position.left).toFixed(0);
                    var top = Math.round(ui.position.top).toFixed(0);
                    $('.input_x').val(left);
                    $('.input_y').val(top);
                    }
                });
        };
        
        //страница замощенния
        var _watermarkPage1 = function () {
            
            if($('.position__second--active').length){
                return false;
            }
            
            var watermark = $('.watermark').eq(0);
            
            $('.container_small-img').on('mousemove', _changePositionDrag);
            var numWidth = Math.round($('.img_big').width() / $('.watermark').width());
            var numHeight = Math.round($('.img_big').height() / $('.watermark').height());
            var numWidthHeight = numWidth * numHeight;
            var contWatermark;
            
            $('.container_small-img').width(numWidth * ($('.watermark').width() + 0));
            $('.container_small-img').height(numHeight * ($('.watermark').height() + 0));
            
             $('.container_small-img').css({
                    'float': "left"
                });
            for (var i = 0; i < numWidthHeight; i++) {
                contWatermark = $('.watermark').clone();
                
                contWatermark.css({
                    'display': 'block',
                    'float': 'left',
                    'margin-left': 0,
                    'margin-bottom': 0,
                });
                
                $('.container_small-img').append(contWatermark);
            }
            return watermark;
        }
        
        //страница позиционированния
        var _setUpListners = function () {
            if($('.position__first--active').length){
                return false;
            }
            
            $('.container_small-img').on('mousemove', _changePositionDrag);
            
            
            $('.position__first').on('click', function(e){
                e.preventDefault();
        
                $('.position__watermark-second').removeClass('hide');
                $('.position__watermark-one').addClass('hide');
                $(this).addClass('position__first--active');
                $('.position__second').removeClass('position__second--active');
                _watermarkPage1();

            });

            $('.position__second').on('click', function(e){
                e.preventDefault();

                $('.position__watermark-one').removeClass('hide');
                $('.position__watermark-second').addClass('hide');
                $(this).addClass('position__second--active');
                $('.position__first').removeClass('position__first--active');
                
                remove();

            });
            
            function remove(){
                var watermark = $('.watermark');
                
                for(var i = 1; i < watermark.length; i++){
                    watermark[i].remove();
                }
            }
            
            $('.watermark-first').on('click', function (e) {
                e.preventDefault();
                $('.watermark-first').removeClass('watermark-link--active');
                $(this).addClass('watermark-link--active');
                var pos = $(this).data("pos");

                $('.container_small-img').position({
                    my: pos,  // место на позиционируемом элементе
                    at: pos,  // место на элементе относительно которого будет позиционирование
                    collision: 'none none',
                    of: '.img_big' // элемент относительно которого будет позиционирование
                });


                //поиск и вывод координатов водяного знака
                var top = Math.round($('.img_small').offset().top) - Math.round($('.img_big').offset().top);
                var left = Math.round($('.img_small').offset().left) - Math.round($('.img_big').offset().left);

                $('.input_x').val(left);
                $('.input_y').val(top);               
            });

            //задает положение через ввод данных в input по оси Х
            inputXY ($('.input_x'), $('.container_small-img'), 'left', 'x');

            //задает положение через ввод данных в input по оси Y
            inputXY ($('.input_y'), $('.container_small-img'), 'top', 'y');

            function inputXY (input, img, position, axis) {
                input.on('keyup', function () {
                    $('.watermark-first').removeClass('watermark-link--active');
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
                    $('.watermark-first').removeClass('watermark-link--active');
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
                    $('.container_small-img').css(position, newValue + 'px' );
                });
            }
        };
        
        


        return {
            init: init
        }
    })();

        position.init();

