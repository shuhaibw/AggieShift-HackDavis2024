const express = require("express");
const cors = require("cors");

const mainRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json()); // parse requests of content-type - application/json

app.use("/", mainRouter); //app.use acts like a middleware

app.listen(3000, () => console.log(`Server is running on port 3000`));
