<?php

$image_path = 'server/php/files/';

function clear($path) {
	if (file_exists($path)) {
	foreach (glob($path.'*') as $file) {
		unlink($file);
		}
	}
}

clear($image_path);
?>