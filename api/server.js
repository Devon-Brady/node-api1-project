// BUILD YOUR SERVER HERE
const express = require("express");
const generate = require("shortid").generate;
const dbFucntions = require("./users/model");
const app = express();
app.use(express.json());
//-----------USER ARRAY------------------------
let users = [{ id: generate(), name: "Devon B", bio: "Web Dev" }];
//---------GET REQUEST------------
app.get("/api/users", (req, res) => {
  dbFucntions
    .find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  dbFucntions
    .findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: `User:${user} does not exist` });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: `The user information could not be retrieved` });
    });
});
//-------------POST REQUEST-----------------
app.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  dbFucntions
    .insert({ name, bio })
    .then((newUser) => {
      if (!name || !bio) {
        res.status(400).json({ message: "Name and Bio are required!" });
      } else {
        res.status(201).json(newUser);
      }
    })
    .catch(() => {
      res.status(500).json({ message: `Can not post user inforamation` });
    });
});
//-------------PUT REQUEST---------------------
app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  dbFucntions
    .update(id, body)
    .then((updatedUser) => {
      if (!body.name || !body.bio) {
        res
          .status(400)
          .json({ message: "Need to have a name and bio to update user." });
      } else {
        res.status(200).json(updatedUser);
      }
    })
    .catch(() => {
      res.status(500).json({ message: `Can not update user information` });
    });
});
//------DELETE REQUEST----------
app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id
    dbFucntions
    .remove(id)
    .then(()=>{
        if(!id){
            res.status(400).json({message:" User not found"})
        }else{
            res.status(200).json({message:`User:${id} has been deleted.`})
        }
    })
    .catch(()=>{
        res.status(500).json({message:`Can not delete user!`})
    })
});
//------------404 REQUEST--------
app.use("*", (req, res) => {
  res.status(404).json({ message: "404 Not found" });
});
module.exports = app; // EXPORT YOUR SERVER instead of {}
