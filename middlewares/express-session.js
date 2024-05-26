// Cookies and Sessions Configuration
const session = require("express-session");
const MongoStore = require("connect-mongo");

const useExpressSession = (app, mongooseConnection) => {
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        ssameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
        secure: process.env.NODE_ENV === "production",
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        // mongooseConnection,
      }),
    })
  );
};

module.exports = useExpressSession;
