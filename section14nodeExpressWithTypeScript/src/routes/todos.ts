// commonJS 에선 아래와 같이 처리하는데 "moduleResolution": "node",  로 처리했기 때문에 기존의 require 커먼JS 코드보다 간결해진다.
import { Router } from "express";
// const express = require('express');
// const Router = express.Router;

import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
} from "../controllers/todos";

const router = Router();

router.post("/", createTodo);

router.get("/", getTodos);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
