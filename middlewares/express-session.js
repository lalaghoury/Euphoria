// Cookies and Sessions Configuration
const session = require("express-session");
const MongoStore = require("connect-mongo");

const useExpressSession = (app) => {
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "strict",
        secure: true,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
      }),
    })
  );
};

module.exports = useExpressSession;
