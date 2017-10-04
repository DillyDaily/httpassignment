let http = require('http');
let port = process.env.PORT || 8000;
var fs = require('fs');

let server = http.createServer(function(req, res) {
//1
  if(req.method === "GET" && req.url === "/intro"){
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to backend!');
//2
  } else if (req.method === "GET" && req.url === "/pets"){
    let pets = ["Pesto", "Maya", "Trueman"];

    let stringPets = JSON.stringify(pets);
      res.setHeader ('Content-Type', 'appilcation/json');
      res.end(stringPets);
//3
  } else if (req.method === "GET" && req.url ==="/getinfo"){
        fs.readFile('./static/info.txt', 'utf8', function(err, data) {
          let info = data;
          if (err) { 
            throw err;
          }
          console.log(data);
          res.setHeader ('Content-Type', 'text/plain');
          res.end(info);
        });
//4
  } else if (req.method === "POST" && req.url === "/getcount"){
    fs.readFile('./static/storage.txt', 'utf8', function(err, data) {
      if (err) { 
        throw err;
      }
      let counter = parseInt(data);
      if (isNaN(counter)){
        counter = 0;
      }

    fs.writeFile('./static/storage.txt', ++counter, (err) => {
        if (err) {
          throw err;
        }
      res.setHeader('Content-Type', 'text/plain');
      res.end(counter+'');
      }); 
    })
//5
  } else if (req.method === "GET" && req.url === "/getcount"){
      fs.readFile('./static/storage.txt', 'utf8', function(err, data) {
        if (err) { 
          throw err;
        }
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
      });
//6      
  } else if (req.method === "GET" && req.url === "/index"){
      fs.readFile('./static/index.html', (err, data) => {
        if (err) { 
          throw err;
      }
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
      });
//7
  } else if (req.method === "GET" && req.url === "/dynamic"){
    fs.readFile('./static/storage.txt', 'utf8', function(err, dataCount) {
      if (err) { 
        throw err;
      }
    fs.readFile('./dynamic/index.html', 'utf8', (err, data) => {

      let newData = data.replace('{{count}}', dataCount);
      if (err) { 
        throw err;
    }
    res.setHeader('Content-Type', 'text/html');
    res.end(newData);
    });
  })

//all undefined requests
  } else {
      res.setHeader('Content-Type', 'text/plain');
      res.end('Route not found');
  }

});

server.listen(port, function() {
  console.log('Listening on port', port);
});
