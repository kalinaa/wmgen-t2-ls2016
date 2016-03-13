;$(document).ready(function(){
	var disabledNode = $('.disabled');
	$('.button-reset').on('click', function(){
		$('.settings__form').find('input').val('');
		$('.file-name').text('');
		$('#main-img, #watermark').removeAttr("alt").removeAttr("src");
		$('.ui-slider-handle').css('left','100%');
		$('#trans-progress').css('width','100%');
        $('.watermark-first').removeClass('watermark-link--active');        
		disabledNode.each(function(){
			$(this).addClass('disabled');
			$('#watermark-input').prop('disabled', true);
		});
	});
});