var cities = [[],
    [
        {"name":"海淀区","value":"100"},
        {"name":"朝阳区","value":"101"},
        {"name":"丰台区","value":"102"}
    ],
    [
        {"name":"石家庄市","value":"200"},
        {"name":"唐山市","value":"201"},
        {"name":"秦皇岛市","value":"202"},
        {"name":"邯郸市","value":"203"}
    ],
    [
        {"name":"杭州市","value":"300"},
        {"name":"绍兴市","value":"301"},
        {"name":"金华市","value":"302"},
        {"name":"宁波市","value":"303"},
        {"name":"嘉兴市","value":"304"}
    ]
];

function findSelect(index){

    var city = document.getElementById("city");

    // 先将之前的内容清空
    city.innerHTML = " ";

    if(index == 0){
        city.setAttribute("class","hide");
    }
    else{
        city.setAttribute("class"," ");

    // 相当于建了一个盘子 可以一次性添加元素而不是每次添加一次
    var plate = document.createDocumentFragment();

    for(var i = 0; i<cities[index].length;i++){
        var option = document.createElement("option");
        option.innerHTML = cities[index][i].name;
        option.value = cities[index][i].value;
        plate.appendChild(option);
    }

    city.appendChild(plate);
}
}