const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Note Management System",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://nsdnotes1.onrender.com",
      },
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const openApiSpec = swaggerJsDoc(options);
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log("Server Started");
  } catch (error) {
    console.log(error);
  }
});
