import { useState } from "react";

function Formulario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    idade: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value, // att o campo 
    });
  };

  const handleSubmit = (e) => {
   
    //vejo se os dados não estão em branco
    if (!formData.nome.trim() || !formData.idade || !formData.email.trim()) {
      alert("Preencha todos os campos!");
      return;
    }
  
    fetch("http://localhost:8800/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      //mando como json
    })
      .then((response) => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
          }
          return response.json();
      })
      .then((data) => console.log("Usuário criado:", data))
      .catch((error) => console.error("Erro ao enviar os dados:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="nome" 
        value={formData.nome} 
        onChange={handleChange} 
        placeholder="Nome" 
      />
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
      />
      <input 
        type="number" 
        name="idade" 
        value={formData.idade} 
        onChange={handleChange} 
        placeholder="Idade" 
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
