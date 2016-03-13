<?php
//include vendor classes
include('SimpleImage.php');

// variables (ajax)
$position_x = 0;
$position_y = 0;
$padding_left = 0;
$padding_top = 0;
$general_scale = 1;
$tiling = false;
$opacity = 1;

if (isset($_POST['positionX'])) {
	$position_x = $_POST['positionX'];
}

if (isset($_POST['positionY'])) {
	$position_y = $_POST['positionY'];
}

if (isset($_POST['padding-left'])) {
	$padding_left = $_POST['padding-left'];
}

if (isset($_POST['padding-top'])) {
	$padding_left = $_POST['padding-top'];
}

if (isset($_POST['generalScale'])) {
	$general_scale = $_POST['generalScale'];
}

if (isset($_POST['tiling'])) {
	if ($_POST['tiling'] == 'true') {
		$tiling = true;
	} else {
		$tiling = false;
	}	
}

if (isset($_POST['opacity'])) {
	$opacity = round($_POST['opacity'],2);
}

$result_position_x = round($position_x/$general_scale,0);
$result_position_y = round($position_y/$general_scale,0);
$result_padding_left = round($padding_left/$general_scale,0);
$result_padding_top = round($padding_top/$general_scale,0);


$preview_width_canvas = 650;
$preview_height_canvas = 534;

$preview_main_path = 'files/preview_main/';
$preview_main_file = 'preview_main.png';
$preview_main_image = $preview_main_path.$preview_main_file;

$preview_wm_path = 'files/preview_wm/';
$preview_wm_file = 'preview_wm.png';
$preview_wm_image = $preview_wm_path.$preview_wm_file;

$main_image_path = 'files/main/';
$watermark_image_path = 'files/watermark/';

//functions
function create_folder($path) {
	$folders = explode('/', $path);
	$folders = array_filter($folders);
	$current_path = '';

	foreach ($folders as $current_folder) {
		if (!file_exists($current_path.$current_folder)) {
			mkdir($current_path.$current_folder, 0777);
		}

		$current_path .= $current_folder.'/';
	}
}

function clear_folder($path) {
	if (file_exists($path)) {
		foreach (glob($path.'*') as $file) {
			unlink($file);
		}
	}
}

function get_image_file($path) {
	foreach (glob($path.'*.{JP*G,PNG,GIF,jp*g,png,gif}',GLOB_BRACE) as $file) {
		if ($file_type = getimagesize($file)) {
			$file_list[filemtime($file)] = $file;
		}	
	}

	if (is_array($file_list)) {
		krsort($file_list);
		$file_first = array_shift($file_list);
	}
	
	return $file_first;
}

function create_dest_image($source_image_file, $dest_path, $dest_file_name, $dest_width, $dest_height) {
	list($source_image_width, $source_image_height, $source_image_type) = getimagesize($source_image_file);
	$source_image_type = image_type_to_mime_type($source_image_type);

	$dest_image = imagecreatetruecolor($dest_width, $dest_height);
	imagealphablending($dest_image, false);
	imagesavealpha($dest_image, true);

	create_folder($dest_path);
	clear_folder($dest_path);

	switch ($source_image_type) {
		case 'image/png':
			$source_image = imagecreatefrompng($source_image_file);
			break;
		case 'image/jpeg':
			$source_image = imagecreatefromjpeg($source_image_file);
			break;
		case 'image/gif':
			$source_image = imagecreatefromgif($source_image_file);
			break;		
	}

	imagecopyresampled($dest_image, $source_image, 0, 0, 0, 0, $dest_width, $dest_height, $source_image_width, $source_image_height);
	imagepng($dest_image,$dest_path.$dest_file_name);
}

function get_image_preview($file_image, $preview_width_canvas, $preview_height_canvas, $dest_image_path, $dest_image_name) {
	$preview_ratio_canvas = round($preview_width_canvas/$preview_height_canvas,3);  
	list($current_width, $current_height, $current_type) = getimagesize($file_image);
	$current_type = image_type_to_mime_type($current_type);

	if ($current_width <= $preview_width_canvas && $current_height <= $preview_height_canvas) {
		$preview_width = $current_width;
		$preview_height = $current_height;
	} else {
		$current_ratio = round($current_width/$current_height,3);

		if ($current_ratio >= $preview_ratio_canvas) {
			$preview_width = $preview_width_canvas;
			$preview_height = round($current_height*$preview_width_canvas/$current_width,0);
		} else {
			$preview_height = $preview_height_canvas;
			$preview_width = round($current_width*$preview_height_canvas/$current_height,0);
		}
	}

	create_dest_image($file_image, $dest_image_path, $dest_image_name, $preview_width, $preview_height);

	$current_scale = round($preview_width/$current_width,2);
	return $current_scale;
}

function get_image_scale($file_image, $dest_image_path, $dest_image_name, $scale = 1) {
	list($current_width, $current_height, $current_type) = getimagesize($file_image);
	$current_type = image_type_to_mime_type($current_type);
	$preview_width = $current_width * $scale;
	$preview_height = $current_height * $scale;
	create_dest_image($file_image, $dest_image_path, $dest_image_name, $preview_width, $preview_height);
} 


function create_watermark_solid($main_image_path, $watermark_image_path, $offset_x, $offset_y, $watermark_opacity, $dest_file_name) {
	$success = false;

	$main_image = new abeautifulsite\SimpleImage($main_image_path);
	$main_image -> overlay($watermark_image_path,'top left', $watermark_opacity, $offset_x, $offset_y);

	$main_image -> save('files/'.$dest_file_name);

	if (file_exists('files/'.$dest_file_name)) {
		$success = true;
	}

	return $success;
}


function create_watermark_tiling($main_image_path, $watermark_image_path, $space_x, $space_y, $offset_x, $offset_y, $watermark_opacity,$dest_file_name){
	$success = false;

	$image_x = $offset_x;
	$image_Y = $offset_y;

	list($main_width, $main_height) = getimagesize($main_image_path);
	list($wm_width, $wm_height) = getimagesize($watermark_image_path);

	$main_image = new abeautifulsite\SimpleImage($main_image_path);

	$step_x = $space_x + $wm_width;
	$iteration_x = round($main_width/$step_x,0) + 1;

	$step_y = $space_y + $wm_height;
	$iteration_y = round($main_height/$step_y,0) + 1;

	for ($i = 0; $i < $iteration_x; $i++) {
		$image_y = $offset_y;	

		for ($j = 0; $j < $iteration_y; $j++) {
			$main_image -> overlay($watermark_image_path, 'top left', $watermark_opacity, $image_x, $image_y);
			$image_y += $step_y;
		}

		$image_x += $step_x; 
	}

	$main_image -> save('files/'.$dest_file_name);

	if (file_exists('files/'.$dest_file_name)) {
		$success = true;
	}

	return $success;
}

// output
// output result.png
$main_image = get_image_file($main_image_path);
$wm_image = get_image_file($watermark_image_path);

$preview_scale = get_image_preview($main_image, $preview_width_canvas, $preview_height_canvas, $preview_main_path, $preview_main_file);
get_image_scale($wm_image, $preview_wm_path, $preview_wm_file, $preview_scale);

// if (file_exists('files/preview.png')) {
// 	unlink('files/preview.png');
// }

// if (file_exists('files/result.png')) {
// 	unlink('files/result.png');
// }

if ($tiling == false) {
 	$preview_scs = create_watermark_solid($preview_main_image,$preview_wm_image,$position_x,$position_y,$opacity,'preview.png');
 	$result_scs = create_watermark_solid($main_image,$wm_image,$result_position_x,$result_position_y,$opacity,'result.png');
} else {
	$preview_scs = create_watermark_tiling($preview_main_image,$preview_wm_image,$padding_left,$padding_top,$position_x,$position_y,$opacity,'preview.png');
	$result_scs = create_watermark_tiling($main_image,$wm_image,$result_padding_left,$result_padding_top,$result_position_x,$result_position_y,$opacity,'result.png');
}

$param = array('resultscs' => $result_scs, 'previewscs' => $preview_scs, 'tiling' => $tiling);
exit(json_encode($param));
?>