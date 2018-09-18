<?php
    // $_REQUEST 不用区分是 get 还是 post, 都能接收
    $state = $_REQUEST[state];
    
    if($state == 1){
        // 获取省份
        echo "浙江省，河北省，北京市"
    }else{
        // 获取城市
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
    }
?>