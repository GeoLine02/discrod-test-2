module.exports = {
  app: { port: +process.env.PORT },
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },

  jwt: { secret: process.env.SECRET },
};
