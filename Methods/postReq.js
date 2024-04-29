const crypto = require('crypto');
const bodyParser = require('../Util/BodyParser');
const WriteToFile = require('../Util/WriteFile');

module.exports = async(req,res) => {
    if (req.url ==='/api/movies') {
        try {
            let body = await bodyParser(req);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            WriteToFile(req.movies);
            res.writeHead( 201, {"Content-Type":"application/json"});
            res.end(
                JSON.stringify(req.movies)
            );
        } catch (e) {
            console.log(e);
            res.writeHead( 400, {"Content-Type":"application/json"});
            res.end(JSON.stringify({
                title:"Validation Failed",
                message:"Body Request is not Valid"
            }))
        }
    }
}