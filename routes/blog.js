const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comments");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createBy",
  );
  console.log(comments, "comments");
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  console.log(blog, "blog");
  res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  await Blog.create({
    title: req.body.title,
    body: req.body.body,
    coverImage: `uploads/${req.file.filename}`,
    createdBy: req.user.id,
  });
  return res.redirect("/");
});

router.post("/comment/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const comment = req.body.comment;
  await Comment.create({
    comment,
    blogId,
    createBy: req.user.id,
  });
  return res.redirect(`/blog/${blogId}`);
});

module.exports = router;
