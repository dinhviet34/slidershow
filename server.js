var express = require("express");
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
server.listen(app.get('port'), function () {
	console.log("Server - Waiting connection at port", app.get('port'));
});
app.get("/", function (req, res) {
	res.render("home");
});
//Read txt
var fs = require('fs')
app.post("/src",function(req,res){
    try{
        var data = fs.readFileSync('src/src.txt','utf-8');
        var lines = data.split('\r\n');
        var arrayobject = new Array();
        for(i in lines){
            if(lines[i] !== ''){
                var jsonobj = new Object();
                jsonobj.name='img' + i;
                jsonobj.src =lines[i]
                arrayobject.push(jsonobj);
            }
            
        }
        res.send(JSON.stringify(arrayobject));
       
    }
    catch(e){
        console.log('error',e.stack);
    }
})