const express = require("express");
const authRoute = require("./routes/userRoute");
const booksRoute = require("./routes/booksRoute");
const dotenv = require("dotenv");
dotenv.config()


// Creating express object.
const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/books", booksRoute);

const port = process.env.PORT || 5000;

//Listening the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
