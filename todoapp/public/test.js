const mysql = require("mysql2/promise");
const config = require("../config.js");

connection = await mysql.createConnection(config.dbSetting);

connection.query(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }  
console.log('connected as id ' + connection.threadId);
});

connection.query("SELECT * from t_task inner join m_category on t_task.id=m_category.id;", function (error, results, fields) {
});
