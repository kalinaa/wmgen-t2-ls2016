var position = (function () {
        var init = function () {
            _setUpListners();
        }

        var _setUpListners = function () {

            $('.watermark-link').on('click', function (e) {
                e.preventDefault();
                var pos = $(this).data("pos");

                $(".img_small").position({
                    my: pos,  // место на позиционируемом элементе
                    at: pos,  // место на элементе относительно которого будет позиционирование
                    collision: 'none none',
                    of: ".img_big" // элемент относительно которого будет позиционирование
                });

                //поиск и вывод координатов водяного знака
                
                var top = Math.round($(".img_small").offset().top).toFixed(0) - Math.round($(".img_big").offset().top).toFixed(0);
                var left = Math.round($(".img_small").offset().left).toFixed(0) - Math.round($(".img_big").offset().left).toFixed(0);

                $('.input_x').val(left);
                $('.input_y').val(top);

                console.log(top);
                console.log(left);
            });

        }

        return {
            init: init
        }
    })();
    
    position.init();