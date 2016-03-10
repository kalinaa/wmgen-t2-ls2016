<?php
	$image_get = false;
	$image_width = 0;
	$image_height = 0;

	if (isset($_POST['url'])) {
		$url = $_POST['url'];
		$image_get = true;
		list($image_width, $image_height) = getimagesize($url);
	}

	$param = array('triger' => $image_get, 'width' => $image_width, 'height' => $image_height);

	exit(json_encode($param));
?>