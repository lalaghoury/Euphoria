const cors = require("cors");

const useCors = (app) => {
  app.use(
    cors({
      origin: [
        "http://localhost:4173",
        "http://localhost:5173",
        "https://euphoria-six.vercel.app",
      ],
      credentials: true,
    })
  );
};

module.exports = useCors;
