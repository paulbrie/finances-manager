var db = require("./db").db;
var users = {
  login: function(callback) {
    /*var sql = 'SELECT * FROM movements';
    db.query(sql, function(err, rows) {
        console.log(callback);
        if(err) {
          console.log("ERROR:model/movements/get", err);
          callback({result: false});
        } else {
          callback({result: true, data: rows});    
        }
    });*/
    callback({result: true, data: {}});
  },
};
module.exports = users;