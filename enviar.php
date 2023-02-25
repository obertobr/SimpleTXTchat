<?php
$time = time();

if($_GET["msg"] == "/clear"){
    $fp = fopen("./chat.txt", 'w');
    fclose($fp);  
} else {
    $fp = fopen("./chat.txt", 'a');
    fwrite($fp, "{$_GET["name"]}ᶍ{$_GET["msg"]}ᶍ{$time}ᶍ{$_GET["color"]}\n");  
    fclose($fp);  
}
?>