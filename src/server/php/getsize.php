<?php
   include('vendor/SimpleImage.php');
   $url = $_POST[url];
   $img = new abeautifulsite\SimpleImage($url);
   $width = $img->get_width();
   $height = $img->get_height();
   $param = array('width' => $width, 'height' => $height);
   exit(json_encode($param));