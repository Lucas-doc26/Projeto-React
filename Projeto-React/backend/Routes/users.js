import express from "express";
import { createUsers, deleteUser, getUsers, updateUser } from "../Controllers/users.js";

const router = express.Router()

router.get("/usuarios", getUsers);
router.get("/usuarios/:id", getUsers);
router.post("/usuarios", createUsers);
router.put("/usuarios/:id", updateUser);
router.delete("/usuarios/:id", deleteUser);

export default router;