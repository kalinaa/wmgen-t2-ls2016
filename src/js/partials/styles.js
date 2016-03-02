;(function(){

    $('.position__first').on('click', function(){
        $('.position__watermark-one').removeClass('hide');
        $('.position__watermark-second').addClass('hide');
    });

    $('.position__second').on('click', function(){
        $('.position__watermark-second').removeClass('hide');
        $('.position__watermark-one').addClass('hide');
    });

}());
