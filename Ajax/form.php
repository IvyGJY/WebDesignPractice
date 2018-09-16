<?php
    $user = $_POST['user'];
    $pwd = $_POST['pwd'];

    if ($user == "admin" && $pwd == "admin"){
        echo "Successful";
    }else{
        echo "Fail";
    }
?>