
const DemoSql = {  
    insert:'INSERT INTO Project(id,a,b,c) VALUES(?,?,?,?)', 
    selectAll:'SELECT * FROM Project',  
    selectId:'SELECT * FROM Project WHERE id = ? ',
    update:'UPDATE Project SET a = ?,b = ?,c = ?,d = ?,updateTime = ? WHERE id = ?',
    deleteArticle:"DELETE FROM Project WHERE id = ? "
  };

  module.exports = DemoSql;