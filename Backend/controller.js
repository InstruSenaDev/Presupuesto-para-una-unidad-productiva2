const pool = require("./db2")



    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    
    app.post('/update', function(req, res) {
      const { name, description } = req.body;
      res.send(`Name ${name}, desc ${description}`);
    });


module.exports = {

    

}