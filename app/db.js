const mysql = require("mysql");
const CONSTS = require('./consts')
const pool = mysql.createPool(CONSTS.database_config.dev);

const query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

module.exports = { query };
