<?php
	error_reporting(E_ALL | E_STRICT);
	
	require_once('clear.php');
	
	$path = 'files/';
	$folder = 'main';

	clear_image_folder($path, $folder);
	
	require('UploadHandler.php');
	$upload_handler = new UploadHandler();
?>