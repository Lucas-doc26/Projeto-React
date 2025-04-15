import React, { useEffect, useState } from "react";

function Crud(){
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    idade: "",
    genero: "",
    anoNascimento:""
  });


  const formulario = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value, 
    });
  };

  //envia para o back
  const submitFormulario = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch("http://localhost:8800/usuarios", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data);
      alert("Usuário cadastrado com sucesso!");

      setFormData({ nome: "", idade: "", cpf: "" });

    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="container-add">
      <h1>Adicionar nova pessoa</h1>
      <form onSubmit={submitFormulario}>
      <input type="text" name="nome" value={formData.nome} onChange={formulario} placeholder="Nome" />
      <input type="text" name="cpf" value={formData.cpf} onChange={formulario} placeholder="Cpf" />
      <input type="number" name="idade" value={formData.idade} onChange={formulario} placeholder="Idade" />
      <button type="submit">Enviar</button>

      
    </form>
    </div>
    
  );
};

export default Crud
