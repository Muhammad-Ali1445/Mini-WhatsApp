const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
var methodOverride = require("method-override");

app.use(methodOverride("_method"));

const Chat = require("./models/chat");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new");
});

app.post("/chats", (req, res) => {
  const { From, Msg, To } = req.body;

  const postNew = new Chat({
    from: From,
    to: To,
    msg: Msg,
  });

  postNew
    .save()
    .then(() => {
      console.log("Chat saved successfully!");
      res.redirect("/chats");
    })
    .catch((err) => {
      console.log("Error saving chat:", err);
      res.status(500).send("Error saving chat: " + err.message);
    });
});

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let searchChatById = await Chat.findById(id);

  if (!searchChatById) {
    return res.status(404).send("Chat not found");
  }
  res.render("edit", { searchChatById });
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;

  await Chat.findByIdAndUpdate(id, { msg }, { runValidators: true, new: true })
    .then(() => {
      console.log("Chat updated successfully!");
      res.redirect("/chats");
    })
    .catch((err) => {
      console.log("Error updating chat:", err);
      res.status(500).send("Error updating chat: " + err.message);
    });
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.listen(4545, () => {
  console.log("Server is Listening on Port 4545");
});
