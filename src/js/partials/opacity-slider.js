;(function (){
    var opacitySlider = $('#slider'),
        watermark =      $('#wm-wrap'),
        progress =      $('#trans-progress');
        watermarkOpacity =       1;
        opacitySlider.slider({
            value: 100,
            slide: function(event, value){
                watermarkOpacity = value.value/100;
                watermark.fadeTo(0, watermarkOpacity);
                imgSettings.opacity = watermarkOpacity;
                progress.width(value.value + '%');
            }
        });
}());