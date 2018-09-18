<?php
    $province = $_POST['province'];
    switch($province){
        case '浙江省':
            echo "杭州市，宁波市，嘉兴市，绍兴市";
            break;
        case '河北省':
            echo "唐山市，石家庄市，保定市";
            break;
        case '北京市':
            echo "朝阳区，海淀区";
            break;
    }
?>