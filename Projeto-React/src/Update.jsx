import React, { useEffect, useState } from "react";

function Update() {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    cpf: "" 
  });

  const [data, setData] = useState([]);  
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  useEffect(() => {
    fetch("http://localhost:8800/usuarios")
      .then((response) => response.json())
      .then((data) => {
        setData(data);  
      });
  }, []);

  const handleChange = (event) => {
    setOpcaoSelecionada(event.target.value);
  };

  const formulario = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value, 
    });
  };

  // Envia para o backend
  const submitFormulario = async (event) => {
    event.preventDefault(); 

    try {
      const usuarioId = opcaoSelecionada;  
      
      const response = await fetch(`http://localhost:8800/usuarios/${usuarioId}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        const errorText = await response.text();  
        console.error("Erro do servidor:", errorText);
        alert(`Erro: ${errorText}`);
        return;
      }

      setFormData({ nome: "", idade: "", cpf: "" });
      setOpcaoSelecionada(''); 

    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Erro ao atualizar usuário");
    }
  };

  return (
    <div className="container-add">
      <h1>Atualizar pessoa</h1>
      <form onSubmit={submitFormulario}>
        <select
          id="opcoes"
          value={opcaoSelecionada}
          onChange={handleChange}
        >
          {data.map((pessoa) => (
            <option key={pessoa.idusuarios} value={pessoa.idusuarios}>
              {pessoa.nome}
            </option>
          ))}
        </select>
        
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={formulario}
          placeholder="Nome"
        />
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={formulario}
          placeholder="Cpf"
        />
        <input
          type="number"
          name="idade"
          value={formData.idade}
          onChange={formulario}
          placeholder="Idade"
        />
        <button type="submit" className="btn-update">Enviar</button>
      </form>
    </div>
  );
}

export default Update;
