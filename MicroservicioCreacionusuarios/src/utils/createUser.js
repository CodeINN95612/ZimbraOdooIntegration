import {
  createUser as odooCreateUser,
  deleteUser as odooDeleteUser,
} from "./odooApi.js";

import {
  createUser as zimbraCreateUser,
  deleteUser as zimbraDeleteUser,
} from "./zimbraApi.js";

export async function createUser({ nombre, usuario, clave }) {
  try {
    odooCreateUser({ nombre, usuario, clave });
    await zimbraCreateUser(usuario, clave);
    console.log("SUCCESS: Usuario creado");
  } catch (e) {
    console.log("ERROR: ", e);
  }
}

export async function deleteUser(user) {
  try {
    odooDeleteUser(user);
    await zimbraDeleteUser(user);
    console.log("SUCCESS: Usuario creado");
  } catch (e) {
    console.log("ERROR: ", e);
  }
}
