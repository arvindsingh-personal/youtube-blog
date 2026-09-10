const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const {
  checkForAuthenticationCookie,
} = require("./midllewares/authentication");
const Blog = require("./models/blog");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then((e) => console.log("MongoDB Connected"));

app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
