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
                containment: imgSettings.containment,
                drag: function(event, ui) {
                    x = $('.img_big').width();
                    y = $('.img_big').height();

                    ui.position.left / 2;
                    ui.position.top / 2;
                    
                    if($('.position__second--active').length){
                        $('.watermark-first').removeClass('watermark-link--active');
                    //Запись координатов с Draggable в input

                        var left = Math.round(ui.position.left).toFixed(0);
                        var top = Math.round(ui.position.top).toFixed(0);
                        $('.input_x').val(left);
                        $('.input_y').val(top);
                       }
                    }
                });
        };
        
        //страница замощенния
        var index = 0;
        var _watermarkPage1 = function () {
            
            if($('.position__second--active').length){
                return false;
            }
            
            $('.input_x-second').val(0);
            $('.input_y-second').val(0);
            $('.line-vertical').width(1);
            $('.line-horizontal').height(1);
            $('.img_small').css({
                'margin-left': '0px',
                'margin-bottom': '0px'
            });
            
            var watermark = $('.img_small');
                
            for(var i = 1; i < watermark.length; i++){
                watermark[i].remove();
            }
            reprod();
            
            function reprod() {
                var numWidth = Math.ceil($('.img_big').width() / $('.img_small').width()) + 1;
                var numHeight = Math.ceil($('.img_big').height()  / $('.img_small').height()) + 1;
                var numWidthHeight = numWidth * numHeight;
                var contWatermark;
                $('.container_small-img').width(Math.ceil(numWidth * ($('.img_small').width())));
                $('.container_small-img').height(Math.ceil(numHeight * ($('.img_small').height())));            

                for (var i = 1; i < numWidthHeight; i++) {
                    contWatermark = $('.img_small').eq(0).clone();
      
                    $('.container_small-img').append(contWatermark);
                }
            }
            
            
            //инпуты в блоке замощенния
            $('.input_x-second').on('keyup', function () {            
                inputEnter($('.input_x-second'), 'height', 'margin-bottom', 'height');                
            });
            $('.input_y-second').on('keyup', function () {
                inputEnter($('.input_y-second'), 'width', 'margin-left', 'width');
            });              
                    
            function inputEnter(input, val1, val2, widthHeight) {
                var value = input.val();
                if (value == ''){
                    value = 0;
                    input.val(value);
                }
                else if(value <= 0){
                    value = 0;
                    input.val(value);
                }
                else if(value >= 100){
                    value = 100;
                    input.val(value);
                }
                $('.container_small-img').css(val1, '0px');
                
                if(widthHeight == 'width'){
                    var imgSize = Math.ceil(($('.img_big').width() / $('.img_small').width()) + 1) * (+$('.img_small').width() + +value);
                    $('.line-vertical').width(+value + 1);
                }
                else if(widthHeight == 'height'){
                    var imgSize = Math.ceil(($('.img_big').height()  / $('.img_small').height()) + 1) * (+$('.img_small').height() + +value);
                    $('.line-horizontal').height(+value + 1);
                }
                
                $('.container_small-img').css(val1, imgSize+'px');
                $('.img_small').css(val2, value + 'px');
            }
            
            //=================================================================
            //изменения растояния между элементами с помощью кнопок вверх, вниз
            index = index + 1;
            if(index == 1){
                $('.indent-bottom-top').on('click', function (e) {
                    e.preventDefault();
                    tilingInput($('.input_x-second'), "+",  'height', 'height', 'margin-bottom');
                });
                $('.indent-bottom-bottom').on('click', function (e) {
                    e.preventDefault();
                    tilingInput($('.input_x-second'), "-",  'height', 'height', 'margin-bottom');
                });
                $('.indent-left-top').on('click', function (e) {
                    e.preventDefault();
                    tilingInput($('.input_y-second'), "+",  'width', 'width', 'margin-left');
                });
                $('.indent-left-bottom').on('click', function (e) {
                    e.preventDefault();
                    tilingInput($('.input_y-second'), "-",  'width', 'width', 'margin-left');
                });

                function tilingInput(input, sign, widthHeight, val1, val2) {
                    
                    if(sign == '+'){
                        var value = + input.val() + 1;  
                    }
                    if(sign == '-'){
                        var value = + input.val() - 1;
                    }
                    
                    if(value <= 0){
                        value = 0;
                    }
                    if(value >= 100){
                        value = 100;
                    }
                
                    input.val(value);
                    for(var i = 1; i < watermark.length; i++){
                        watermark[i].remove();
                    }
                    $('.container_small-img').css(val1, '0px');
                
                    if(widthHeight == 'width'){
                        var imgSize = Math.ceil(($('.img_big').width() / $('.img_small').width()) + 1) * (+$('.img_small').width() + +value);
                        if(sign == '+'){
                            if(value >= 100){
                                $('.line-vertical').width(100);
                            }
                            else{
                                $('.line-vertical').width(+value + 1);
                            }
                        }
                        else if(sign == '-'){
                            if(value <= 1){
                                $('.line-vertical').width(1);
                            }
                            else{
                                $('.line-vertical').width(+value - 1);
                            }
                        }
                    }
                    else if(widthHeight == 'height'){
                        var imgSize = Math.ceil(($('.img_big').height()  / $('.img_small').height()) + 1) * (+$('.img_small').height() + +value);
                        if(sign == '+'){
                            if(value >= 100){
                                $('.line-horizontal').height(100);
                            }
                            else{
                                $('.line-horizontal').height(+value + 1);
                            }                           
                        }
                        else if(sign == '-'){
                            if(value <= 1){
                                $('.line-horizontal').height(1);
                            }
                            else{
                                $('.line-horizontal').height(+value - 1);
                            }                           
                        }
                    }
                
                    $('.container_small-img').css(val1, imgSize+'px');
                    $('.img_small').css(val2, value + 'px');

                }
            }
            //=================================================================
        };

        //Запуск draggeble
        $('.container_small-img').on('mousemove', function(){
            if($('.position__second--active').length){
                    if(($('.img_small').width() <= $('.img_big').width()) || ($('.img_small').height() <= $('.img_big').height())){
                        imgSettings.containment = 'parent';
                    }
                    else{
                        imgSettings.containment = false;
                    }
            $('.container_small-img').on('mousemove', _changePositionDrag);
            }
        else if($('.position__first--active').length){
              imgSettings.containment = false;
              $('.container_small-img').on('mousemove', _changePositionDrag); 
            }
        });

        //страница позиционированния
        var _setUpListners = function () {
            if($('.position__first--active').length){
                return false;
            }
            
            $('.input_x').val(0);
            $('.input_y').val(0);          
            
            // переключения режимов
            var index = 0;
            $('.position__first').on('click', function(e){
                e.preventDefault();
        
                $('.position__watermark-second').removeClass('hide');
                $('.position__watermark-one').addClass('hide');
                $(this).addClass('position__first--active');
                $('.position__second').removeClass('position__second--active');
                $('.watermark-first').removeClass('watermark-link--active');
                index++;                
         
                    _watermarkPage1();                

                $('.container_small-img').position({
                    my: 'left top',
                    at: 'left top',  
                    collision: 'none none',
                    of: '.img_big' 
                });
                imgSettings.tilling = true;                
            });

            $('.position__second').on('click', function(e){
                e.preventDefault();

                $('.position__watermark-one').removeClass('hide');
                $('.position__watermark-second').addClass('hide');
                $(this).addClass('position__second--active');
                $('.position__first').removeClass('position__first--active');
                
                remove();
                $('.container_small-img').position({
                    my: 'left top',
                    at: 'left top',  
                    collision: 'none none',
                    of: '.img_big' 
                });
                $('.input_x').val(0);
                $('.input_y').val(0);
                $('.img_small').css('margin-left', '0px');
                $('.line-vertical').width(1);
                $('.img_small').css('margin-bottom', '0px');
                $('.line-horizontal').height(1);
                imgSettings.tilling = false;
            });
            
            function remove(){
                var watermark = $('.img_small');
                
                for(var i = 1; i < watermark.length; i++){
                    watermark[i].remove();
                }
                
                var container = $('.container_small-img');
                
                container.css({
                    'width': 'auto',
                    'height': 'auto'
                });
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

                //передаем позицию по х и у в модуль настроек
                imgSettings.top = top;
                imgSettings.left = left;

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
                            if(($('.img_small').width() <= $('.img_big').width()) || ($('.img_small').height() <= $('.img_big').height())){
                                value = maxValueX;
                                input.val(maxValueX);
                            }
                        }
                        else if(value < 0){
                            if(($('.img_small').width() <= $('.img_big').width()) || ($('.img_small').height() <= $('.img_big').height())){
                                value = 0;
                                input.val(0);
                            }
                        }
                    }
                    if(axis == 'y'){
                        var maxValueY = $('.img_big').height() - $('.img_small').height();
                        if(value >= maxValueY){
                            if(($('.img_small').width() <= $('.img_big').width()) || ($('.img_small').height() <= $('.img_big').height())){
                                value = maxValueX;
                                input.val(maxValueX);
                            }
                        }
                        else if(value < 0){
                            if(($('.img_small').width() <= $('.img_big').width()) || ($('.img_small').height() <= $('.img_big').height())){
                                value = 0;
                                input.val(0);
                            }
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
                                if(($('.img_small').width() <= $('.img_big').width()) || ($('.img_small').height() <= $('.img_big').height())){
                                    newValue = maxValueX;
                                }
                                else{
                                    newValue = +value + 1;
                                }
                            }
                            else{
                                newValue = +value + 1;
                                //imgSettings.left = imgSettings.left + 1;
                            }
                        }
                        else if(axis == 'y'){
                            var maxValueY = $('.img_big').height() - $('.img_small').height();
                            if(value >= maxValueY){
                                if(($('.img_small').width() <= $('.img_big').width()) || ($('.img_small').height() <= $('.img_big').height())){
                                    newValue = maxValueY;
                                }
                                else{
                                    newValue = +value + 1;
                                }
                            }
                            else{
                                newValue = +value + 1;
                                //imgSettings.top = imgSettings.top + 1;
                            }
                        }
                    }
                    else if(math == '-'){
                        if(value <= 0){
                             if(($('.img_small').width() <= $('.img_big').width()) || ($('.img_small').height() <= $('.img_big').height())){
                                 newValue = 0
                             }
                             else{
                                 newValue = +value - 1;
                             }
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

