import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // reemplaza con la URL de tu API
});

export const crearUsuarios = async (usuario) => {
  try {
    const response = await api.post("/crearUsuario", usuario);
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario", error);
    throw error;
  }
};

export const borrarUsuarios = async (usuario) => {
  try {
    const response = await api.post(`/borrarUsuario`, usuario);
    return response.data;
  } catch (error) {
    console.error("Error al borrar el usuario", error);
    throw error;
  }
};
