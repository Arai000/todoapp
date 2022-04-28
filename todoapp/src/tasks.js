// 新規登録処理

const mysql = require("mysql2/promise");
const config = require("../config.js");

/**
 * タスクを新規登録する API
 *
 * @returns レスポンス JSON
 */
postTasks = async function (body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "SELECT task_id FROM todoapp.t_task;";
    const [rows, fields] = await connection.query(sql);
    let i=1;
    while (rows.some(u=>u.task_id===i)===true) {
      i+=1;
    }
    console.log(i);
    const sql2 =
      "INSERT INTO todoapp.t_task (task_id, user_id, task_name, deadline, category_id, status_id) VALUES (?,?,?,?,?,?);";
    let d = [i, body.user_id, body.taskName, body.deadline, body.category, 0];
    const [rows2, fields2] = await connection.query(sql2, d);

    console.log(rows2);
    return rows2;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを一覧取得する API
 *
 * @returns レスポンス JSON
 */
getTasks = async function (user_id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ?;";
      let d = [user_id];
    const [rows, fields] = await connection.query(sql,d);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

getSortedTasks = async function (user_id,sort,asc) {
  let connection = null;
  try {
    console.log("here1");
    console.log(sort);
    console.log(asc);
    connection = await mysql.createConnection(config.dbSetting);
    var sql = "";
    switch (sort){
      case "0":
        if (asc==0){
          sql = "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ? ORDER BY t_task.task_name DESC;";
        }else{
          sql = "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ? ORDER BY t_task.task_name ASC;";
        }
        break;
      case "1":
        if (asc==0){
          sql = "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ? ORDER BY m_category.category_name DESC;";
        }else{
          sql = "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ? ORDER BY m_category.category_name ASC;";
        }
        break;
      case "2":
        if (asc==0){
          sql = "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ? ORDER BY t_task.deadline DESC;";
        }else{
          sql = "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ? ORDER BY t_task.deadline ASC;";
        }
        break;
      case "3":
        if (asc==0){
          sql = "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ? ORDER BY t_task.updated_at DESC;";
        }else{
          sql = "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ? ORDER BY t_task.updated_at ASC;";
        }
        break;
      case "4":
        if (asc==0){
          sql = "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ? ORDER BY m_status.status_name DESC;";
        }else{
          sql = "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE m_user.user_id = ? ORDER BY m_status.status_name ASC;";
        }
        break;
    }
    console.log(sql);
    let d = [user_id];
    const [rows, fields] = await connection.query(sql,d);
    console.log("here5");
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを１件削除する API
 *
 * @returns レスポンス JSON
 */
deleteTasksId = async function (task_id,user_id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql = "DELETE from todoapp.t_task WHERE task_id = ? and user_id = ?;";
    let d = [task_id,user_id];
    const [rows, fields] = await connection.query(sql, d);

    // console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを１件取得する API
 *
 * @returns レスポンス JSON
 */
getTasksId = async function (user_id,task_id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "SELECT * FROM todoapp.t_task inner join todoapp.m_category ON t_task.category_id = m_category.category_id inner join todoapp.m_user ON t_task.user_id = m_user.user_id inner join todoapp.m_status ON t_task.status_id = m_status.status_id WHERE t_task.user_id = ? and t_task.task_id = ?;";
    let d = [user_id,task_id];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを１件更新する API
 *
 * @returns レスポンス JSON
 */
patchTasksId = async function (user_id,task_id,body) {
  let connection = null;
  try {
    console.log("tasks.js");
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "UPDATE todoapp.t_task SET task_name=?, deadline=?, category_id=?, status_id=?, updated_at=? WHERE user_id=? and task_id=?;";
    let d = [
      body.taskName,
      body.deadLine,
      body.category,
      body.status,
      new Date(),
      user_id,
      task_id,
    ];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.getTasks = getTasks;
exports.postTasks = postTasks;
exports.deleteTasksId = deleteTasksId;
exports.getTasksId = getTasksId;
exports.patchTasksId = patchTasksId;
exports.getSortedTasks = getSortedTasks;