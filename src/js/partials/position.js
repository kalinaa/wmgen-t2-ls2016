var position = (function () {
    var image = $('.img_small'),
        info;


        var init = function () {
            _setUpListners();
            _changePositionDrag();
        };

            // Смена координат с помощью мыши
            var _changePositionDrag = function() {
                image.draggable({
                    cursor: 'move',
                    containment: 'parent',
                    drag: function(event, ui) {
                        x = $('.img_big').width();
                        y = $('.img_big').height();
                        ui.position.left / x;
                        ui.position.top / y;

                    }
                });
            };

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

        };



        return {
            init: init
        }
    })();

    position.init();