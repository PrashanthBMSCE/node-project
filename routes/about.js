var express=require('express');

module.exports=function(router){

    router.get('/about',function(req,res,next){
        res.render('about',{
            title:'Express',
            name:'prashanth'
        });
    });
    return router;
}

