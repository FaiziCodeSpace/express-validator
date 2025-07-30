import express from "express";
import { body, validationResult } from "express-validator";
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];

app.get("/getUsers", (req, res) => {
  res.json(users);
});

app.post(
  "/postUsers",
  [
    body("name")
      .notEmpty()
      .withMessage("name shouldnot be left empty")
      .isAlphanumeric()
      .withMessage("Alphabets and Numbers only"),
    body("email").isEmail().normalizeEmail().withMessage("must be an email"),
  ],
  (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json(error);
    }
    const id = users.length + 1;
    const { name, email } = req.body;
    const newUser = { id, name, email };
    users.push(newUser);
    console.log({ newUser });
    res.json(users);
  }
);

app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
});
