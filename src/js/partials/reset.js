;$(document).ready(function(){
	var disabledNode = $('.disabled');
	$('.button-reset').on('click', function(){
		$('.settings__form').find('input').val('');
		$('.file-name').text('');
		$('#main-img, #watermark').removeAttr("alt").removeAttr("src");
		imgSettings.tiling = false;
		$('.position__second').trigger('click');
		$('.ui-slider-handle').css('left','100%');
		$('#trans-progress').css('width','100%');
		disabledNode.each(function(){
			$(this).addClass('disabled');
			$('#watermark-input').prop('disabled', true);
		});
	});
});