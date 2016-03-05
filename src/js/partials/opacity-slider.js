;(function (){
    var opacitySlider = $('#slider'),
        smallImg =      $('#watermark'),
        progress =      $('#trans-progress');
        watermarkOpacity =       1;
        opacitySlider.slider({
            value: 100,
            slide: function(event, value){
                watermarkOpacity = value.value/100;
                smallImg.fadeTo(0, watermarkOpacity);
                progress.width(value.value + '%');
            },
            change: function() {
                return watermarkOpacity
            }
        });
}());