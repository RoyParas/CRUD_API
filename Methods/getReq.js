module.exports = (req, res) => {
  let uuid = require("uuid");
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];


  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } 
  else if(!uuid.validate(id)){
    res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Not a Valid Id",
        })
      );
  }
  else if (baseUrl === "/api/movies/" && uuid.validate(id)) {
    let movie = req.movies.find((movie) => movie.id === id);
    if (movie) {
      (res.statusCode = 200); 
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(movie));
      res.end();
    } 
    else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "404 NOT FOUND",
          message: "Movie Not Found",
        })
      );
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
