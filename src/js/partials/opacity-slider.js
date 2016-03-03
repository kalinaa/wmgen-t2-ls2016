;(function (){
    var opacitySlider = $('#slider'),
        smallImg =      $('#watermark'),
        progress =      $('#trans-progress');
        opacity =       1;
        opacitySlider.slider({
            value: 100,
            slide: function(event, value){
                opacity = value.value/100;
                smallImg.fadeTo(0, opacity);
                progress.width(opacity)
            }
        });
}());