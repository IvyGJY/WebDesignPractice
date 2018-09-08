var app = new Vue(
    {
        el: "#app",
        data:{
            message : "Hello World"
        }
    }
);

var app2 = new Vue(
    {
        el: "#app-2",
        data:{
            mes : "创建于"+ new Date().toLocaleDateString()
        }
    }
);

var app3 = new Vue({
    el: "#app-3",
    data : {
        name:''
    }
});