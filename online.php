<?php
$time = time();
$nameExist = false;
$teste = [];
$linecount = 0;
$fp = fopen("./online.txt", 'r');
while(!feof($fp)){
    $line = fgets($fp);
    if($line == ""){
        break;
    }
    $res = explode("ᶍ",rtrim($line, "\n"));
    $teste[$linecount] = $res;
    $linecount++;
  }
fclose($fp);
$fp = fopen("./online.txt", 'w');
foreach($teste as &$value){
    if($value[0] == $_GET["name"]){
        $value[1] = $time;
        $nameExist = true;
    }
    if($time-3 < $value[1]){
        fwrite($fp, "{$value[0]}ᶍ{$value[1]}\n"); 
    } 
}
if(!$nameExist and $_GET["name"] != "null"){
    fwrite($fp, "{$_GET["name"]}ᶍ{$time}\n");  
}
fclose($fp);
echo json_encode($teste);
?>