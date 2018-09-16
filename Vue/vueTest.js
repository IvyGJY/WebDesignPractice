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

var vm = new Vue({
    el:"#watchPractice",
    data:{
        firstName : "Foo",
        lastName : "Bar",
        fullName : "Bar Foo"
    },
    // 做了一个事件监听，如果数据中 firstName 或 lastName发生改变，fullName 会随之动态改变
    watch:{
        firstName:function(val){
            return this.fullName =  val+" "+this.lastName;
        },
        lastName:function(val){
            return this.fullName =  this.firstName+" "+val;
        }
    }
});


