import express from "express";
import userRoutes from "./Routes/users.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", userRoutes);

app.listen(8800, () => {
  console.log("Servidor backend rodando em http://localhost:8800/usuarios");
});

