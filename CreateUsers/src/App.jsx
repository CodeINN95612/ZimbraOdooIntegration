import React, { useState } from "react";
import { crearUsuarios, borrarUsuarios } from "./utils/api.js";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("create");

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <h2>Manejo de Empleados</h2>
      <div className="tabs">
        <button
          onClick={() => switchTab("create")}
          className={activeTab === "create" ? "active" : ""}
        >
          Create User
        </button>
        <button
          onClick={() => switchTab("delete")}
          className={activeTab === "delete" ? "active" : ""}
        >
          Delete User
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "create" && <CreateUserTab />}
        {activeTab === "delete" && <DeleteUserTab />}
      </div>
    </div>
  );
}

function CreateUserTab() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    crearUsuarios({
      nombre: name,
      usuario: username,
      clave: password,
    });
    // Clear input fields after submission
    setName("");
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function DeleteUserTab() {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    console.log("Deleting user:", { username });
    borrarUsuarios({ usuario: username });
    setUsername("");
  };

  return (
    <div>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
