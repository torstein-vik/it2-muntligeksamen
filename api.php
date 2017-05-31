<?php
    ini_set("allow_url_fopen", 1);

    if(isset($_POST["url"])){
        echo file_get_contents($_POST["url"]);
    }
?>
