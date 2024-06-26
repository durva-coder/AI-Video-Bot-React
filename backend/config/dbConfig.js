module.exports = {
  port: "3306",
  host: "127.0.0.1",
  user: "root",
  password: "abc",
  db: "durvab",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
