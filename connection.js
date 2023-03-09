var sql=require('mysql');

var con=sql.createConnection({
    
    'localhost':'root',
    'user':'root',
    "password":'',
    "database":'job'

})

con.connect(function(err){
    if(err)throw err;
    console.log("connect")
})







module.exports=con;



