<?php

function clear_image_folder($path, $folder) {
	$current_path = $path.$folder.'/';

	if (file_exists($current_path)) {
	foreach (glob($current_path.'*') as $file) {
		unlink($file);
		}
	}
}

?>