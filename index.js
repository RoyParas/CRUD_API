const http = require("http");
const getReq = require("./Methods/getReq");
const putReq = require("./Methods/putReq");
const postReq = require("./Methods/postReq");
const deleteReq = require("./Methods/deleteReq");
let movies = require("./Data/movies.json");

// require('dotenv').config();
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ 
        title:"404 NOT FOUND", 
        message: "Route Not Found" 
    }));
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`);
});


