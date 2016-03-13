;$(document).ready(function(){
	var disabledNode = $('.disabled');
	$('.button-reset').on('click', function(){
		$('.settings__form').find('input').val('');
		$('.file-name').text('');
		imgSettings.tilling = false;
		$('.position__second').trigger('click');
		$('#main-img, #watermark').removeAttr("alt").removeAttr("src");
		$('.ui-slider-handle').css('left','100%');
		$('#trans-progress').css('width','100%');
		disabledNode.each(function(){
			$(this).addClass('disabled');
			$('#watermark-input').prop('disabled', true);
		});
	});
});