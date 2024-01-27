import express, { json } from "express";
import { createUser, deleteUser } from "./utils/createUser.js";
const app = express();
app.use(json());

app.post("/crearUsuario", async (req, res) => {
  const user = req.body;

  await createUser(user);

  res.status(200).send(`Usuario creado exitosamente: ${user}`);
});

app.post("/borrarUsuario", async (req, res) => {
  const { usuario } = req.body;

  await deleteUser(usuario);

  res.status(200).send("Usuario borrado exitosamente");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
