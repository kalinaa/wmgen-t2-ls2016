<?php
	error_reporting(E_ALL | E_STRICT);

	if (isset($_GET['folder'])) {
		$folder = trim($_GET['folder']);
	}
	
	$path = 'files/';
	$current_folder = $path.$folder;

	if (!file_exists($current_folder)) {
		mkdir($current_folder, 0777);
	}

	require_once('clear.php');
	
	clear_image_folder($path, $folder);

	require('UploadHandler.php');
	$upload_handler = new UploadHandler();
?>