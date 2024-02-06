var fs = require('fs')
var http = require('http')
var multer = require('multer')

http.createServer(function(req,res){
    if (req.url=="/") {
        fs.readFile('home.html',function(error,data) {
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data)
            res.end()
        });
    }else if(req.url=="/about"){
        fs.readFile('about.html',function(error,data) {
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data)
            res.end()
        });
    }else if(req.url=="/contact"){
        fs.readFile('contact.html',function(error,data) {
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data)
            res.end()
        });
    }else if(req.url=="/file-write"){
        fs.writeFile('demo.txt','hello world',function(error){
            if(error){
                res.writeHead(404,{'Content-Type':'text/html'})
                res.write("File Write Fail")
                res.end()
            }else{
                fs.readFile('file-write.html',function(error,data) {
                    res.writeHead(200,{'Content-Type':'text/html'})
                    res.write(data)
                    res.end()
                });
            }
        })
    }else if(req.url == "/file-upload"){
        fs.readFile('upload.html',function(error,data) {
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data)
            res.end()
        });
    }else if(req.url === "/upload" && req.method === "POST"){
        const storage=multer.diskStorage({
            destination:function(req,file,cb){
                cb(null,'./uploads')
            },
            filename:function(req,file,cb){
                cb(null,file.originalname)
            }
        })
        var upload = multer({storage:storage}).single('myFile')
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log("Multer Error:", err);
                res.writeHead(500);
                res.end("Error uploading file.");
            } else if (err) {
                console.log("Unknown Error:", err);
                res.writeHead(500);
                res.end("Error uploading file.");
            } else {
                fs.readFile('upload.html',function(error,data) {
                    let htmlContent = data.toString();
                    htmlContent = htmlContent.replace('d-none', '');
                    res.writeHead(200,{'Content-Type':'text/html'})
                    res.write(htmlContent)
                    res.end()
                });
            }
        });
    }else{
        res.writeHead(404,{'Content-Type':'text/html'})
        res.write(`<h1>Page Not Found</h1>`)
        res.end()
    }
}).listen(5500,function(){
    console.log("starts listening on port 5500");
})