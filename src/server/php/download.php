<?php
    include('vendor/SimpleImage.php');
    if($_POST){
        $img = new abeautifulsite\SimpleImage('files/coon.jpg');
        $img->overlay('files/path.jpg', 'left top', .5 , -10, -10);
        $img->save('files/marked/marked.jpg');
    };
    exit('готово!');