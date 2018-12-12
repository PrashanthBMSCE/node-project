var express=require('express');
var vd=require('../videodata.json')

module.exports=function(router){
    
    router.get('/',function(req,res,next){
        res.render('index',{
            title:'Express',
            name:'prashanth',
            videodata:vd
        });
    })
    
    return router;
}