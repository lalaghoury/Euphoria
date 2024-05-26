const express = require("express");
const path = require("path");

const useMiddlewares = (app) => {
  // Configuring Express JSON
  const useJson = require("../middlewares/json");
  useJson(app);

  // Configuring CORS
  const useCors = require("../middlewares/cors");
  useCors(app);

  // Configuring Cookie Parser
  const useCookieParser = require("../middlewares/cookie-parser");
  useCookieParser(app);

  // Configuring Express Session
  const useExpressSession = require("../middlewares/express-session");
  useExpressSession(app);

  // Middleware to serve static files
  app.use(express.static(path.join(__dirname, "../client", "dist")));

  // Configuring Passport
  const usePassport = require("../middlewares/passport");
  usePassport(app);
};

module.exports = useMiddlewares;
