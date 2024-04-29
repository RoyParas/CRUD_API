const WriteToFile = require('../Util/WriteFile');
module.exports = (req,res) => {
    let uuid = require("uuid");
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];
    if (baseUrl === "/api/movies/" && uuid.validate(id)){
        res.statusCode = 204;
        res.setHeader("Content-Type","application/json");
        let filteredMovie = req.movies.filter((movie)=> {
            return movie.id != id;
        })
        WriteToFile(filteredMovie);
        res.write(JSON.stringify(filteredMovie));
        res.end();
    }
}