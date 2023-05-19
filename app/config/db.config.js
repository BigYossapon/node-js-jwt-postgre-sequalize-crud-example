module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "bp0827705271",
  DB: "projects",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
