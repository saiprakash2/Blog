import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import _ from "lodash";


const homeStartingContent = "My journey";
const aboutContent = "My name is Saiprakash. I am Tech and economics enthusiast. ";
const contactContent = "Saiprakashshet2@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {

  title: String,
 
  content: String
 
 };

 const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  Post.find({},function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", async function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});

app.get("/posts/:postID", function(req, res){
  const requestedpostID = req.params.postID;

  Post.findOne({_id:requestedpostID},function(err,post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
