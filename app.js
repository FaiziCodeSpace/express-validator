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
      .custom((value) => {
        const existUser = users.find((user) => user.name === value);
        if (existUser) {
          throw new Error("The name already exist!");
        }
        return true;
      })
      .notEmpty()
      .withMessage("name shouldnot be left empty")
      .isAlphanumeric()
      .withMessage("Alphabets and Numbers only"),
    body("email").isEmail().normalizeEmail().withMessage("must be an email"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorObj = {};
      errors.array().forEach((err) => {
        errorObj["error"] = err.msg;
      });
      return res.status(400).json({ errors: errorObj });
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
