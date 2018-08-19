var categories = [
    {"id":10, "name":"男装", "nextLevel":[
        {"id":101, "name":"西服"},
        {"id":102, "name":"T恤"},
        {"id":103, "name":"短裤"}
    ]},
    {"id":20, "name":"女装", "nextLevel":[
        {"id":201, "name":"短袖"},
        {"id":202, "name":"裙装", "nextLevel":[
            {"id":2021, "name":"长裙"},
            {"id":2022, "name":"短裙"},
            {"id":2023, "name":"超短裙"},
            {"id":2024, "name":"连衣裙"}
        ]},
        {"id":203, "name":"裤装", "nextLevel":[
            {"id":2031, "name":"九分裤"},
            {"id":2032, "name":"铅笔裤"},
            {"id":2033, "name":"阔腿裤"}
        ]}
    ]},
    {"id":30, "name":"童装", "nextLevel":[
        {"id":301, "name":"上衣"},
        {"id":302, "name":"套装", "nextLevel":[
            {"id":3021, "name":"0-3岁"},
            {"id":3022, "name":"4-6岁"},
            {"id":3023, "name":"7-9岁"}
        ]}
    ]}
];

function loadData (data){
    var select = document.createElement("select");

    // 先加一个请选择项
    select.add(new Option("--请选择--", 0));
    // 遍历 data 的元素，添加 option
    for (var i=0; i<data.length; i++){
        select.add(new Option(data[i].name, data[i].id));
    }

    // 将select加到页面中
    document.querySelector("#category").appendChild(select);

    // 选中某一项后，显示该项的子列表 （递归）
    select.onchange = function (){

        // 如果没有下一级列表的时候，要把之前出现的 select 框删掉
        // 其实是，只要当前选中的这个 select 后面还有 select，就删掉，如果有新的下级列表时，后面递归会自己加上
        while(this.parentNode.lastChild != this){
            document.querySelector("#category").removeChild(this.parentNode.lastChild);
        }

        // 因为我们添加了一个 “请选择” 的 option，所以导致 data 中的下标和 categories 中的下标错位
        // 当 this.selectedIndex 为 0 的时候,会导致 selectedIndex-1 出错，所以要加一个判断，判断当前的 index 是否为0
        if(this.selectedIndex){
            if(data[this.selectedIndex-1].nextLevel){
                loadData(data[this.selectedIndex-1].nextLevel);
            }
        } 
    }
}

window.onload = function(){
    loadData(categories);
}