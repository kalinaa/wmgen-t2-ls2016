;$('.button-reset').on('click', function(){
	$('.settings__form').find('input').val('');
	$('.file-name').html('');
	$('#main-img, #watermark').removeAttr("alt").removeAttr("src");
	$('.ui-slider-handle').css('left','50%');
});