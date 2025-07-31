import express from "express";
import { validationResult } from "express-validator";
import { formValidation } from "./validator/validation.js";
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock DataBase  
export let users = [];

app.get("/getUsers", (req, res) => {
  res.json(users);
});

app.post("/postUsers", formValidation, (req, res) => {
  // Error Handler
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorObj = {};
    errors.array().forEach((err) => {
      errorObj["error"] = err.msg;
    });
    return res.status(400).json({ errors: errorObj });
  }
  // Logic
  const id = users.length + 1;
  const { name, email, password } = req.body;
  const newUser = { id, name, email , password};
  users.push(newUser);
  console.log({ newUser });
  res.json(users);
});

app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
});
