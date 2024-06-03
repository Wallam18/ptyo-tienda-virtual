"use client";

import { useState, useEffect } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios();
  }, []);

  function getUsuarios() {
    return fetch("http://localhost:8080/usuarios")
      .then((res) => res.json())
      .then(setUsuarios);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const nombre = form.get("nombre");
    const correo = form.get("email");
    const payload = { nombre, correo };
    await fetch("http://localhost:8080/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    await getUsuarios();
  }
  return (
    <div>
      <h1>Usuarios</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" type="text" name="nombre" />
        <label htmlFor="email">Nombre</label>
        <input id="email" type="email" name="email" />
        <button type="submit">Crear usuario</button>
      </form>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.correo}
          </li>
        ))}
      </ul>
    </div>
  );
}
