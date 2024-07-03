const mongoose = require("mongoose");

const Chat = require("./models/chat");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "Fahan",
    to: "Subhan",
    msg: "Where are you?",
  },
  {
    from: "Saqlain",
    to: "Zain",
    msg: "Give me maths Notes",
  },
  {
    from: "Amir",
    to: "Umar",
    msg: "Give me this bundle of cloths?",
  },
  {
    from: "Umer",
    to: "Farman",
    msg: "Saraiki",
  },
  {
    from: "Ali Munir",
    to: "Rameez Ahmed",
    msg: "When you would go for a walk ?",
  },
  {
    from: "Rameez",
    to: "Ali Munir",
    msg: "InshaAllah! tomorrow",
  },
  {
    from: "Faizan",
    to: "Nawab",
    msg: "SEnd your resume plz",
  },
];

Chat.insertMany(allChats);
//   chat1
//     .save()
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
