const http=require("http");
const url=require("url");
const querystring = require('querystring');
http.createServer(function(req,res){
    res.setHeader('access-control-allow-origin', '*');
    var pathname=url.parse(req.url).pathname;
    var query = url.parse(req.url).query;
    
    if(pathname=='/test'){
        var postData = "";
        req.on("data", function (getDataChunk) {
            postData += getDataChunk;
          });
          
        req.on("end",function(){
            var params = querystring.parse(postData);
            var a=params.name;
            console.log(a);
            res.write("收到了");
            res.end();
        })
    }
}).listen(8080);