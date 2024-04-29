const crypto = require("crypto");
const bodyParser = require("../Util/BodyParser");
const WriteToFile = require("../Util/WriteFile");
const { title } = require("process");
module.exports = async (req, res) => {
  let uuid = require("uuid");
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  if (!uuid.validate(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "Not a Valid Id",
      })
    );
  }
  else if(baseUrl === '/api/movies/' && uuid.validate(id)){
    let index = req.movies.findIndex((movie) => movie.id === id);
    if(index){
        let body = await bodyParser(req);
        req.movies[index] = {id, ...body};
        WriteToFile(req.movies);
        res.writeHead(200 , {'Content-Type': 'application/json'});
        res.end(
            JSON.stringify(req.movies[index])
        )
    }
    else{
        res.writeHead(404, {'Content-Type':'application/json'});
        res.end(
            JSON.stringify({
                title: "404 Not Found",
                message:" Movie Not Found"
            })
        )
    }
  }
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "404 NOT FOUND",
        message: "Route Not Found",
      })
    );
  }
};
