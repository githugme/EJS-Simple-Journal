//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "So, the Earth's average temperature has increased about 2 degrees Fahrenheit during the 20th century. What's the big deal? Two degrees may sound like a small amount, but it's an unusual event in our planet's recent history Earth's climate record, preserved in tree rings, ice cores, and coral reefs, shows that the global average temperature is stable over long periods of time. Furthermore, small changes in temperature correspond to enormous changes in the environment.For example, at the end of the last ice age, when the Northeast United States was covered by more than 3,000 feet of ice, average temperatures were only 5 to 9 degrees cooler than today.";
const aboutContent = "Countless dreams, Endless thoughts, No days off";
const contactContent = "Rookie project so take my spam gmail lol harijrlm@gmail.com. Share memes and I'll do the same?";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
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

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
