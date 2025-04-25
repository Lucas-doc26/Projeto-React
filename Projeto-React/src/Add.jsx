import React, { useEffect, useState } from "react";
import "./Crud.css"; 

function Add() {
  const [formAdd, setFormAdd] = useState({
    nome: "",
    email: "",
    idade: "",
    genero: "",
    dataNascimento: "",
    cpf: ""
  });

  const [formUpdate, setFormUpdate] = useState({
    nome: "",
    email: "",
    idade: "",
    genero: "",
    dataNascimento: "",
    cpf: ""
  });

  const [data, setData] = useState([]);  
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  useEffect(() => {
    fetch("http://localhost:8800/usuarios")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleAddChange = (event) => {
    setFormAdd({
      ...formAdd,
      [event.target.name]: event.target.value, 
    });
  };

  const handleUpdateChange = (event) => {
    setFormUpdate({
      ...formUpdate,
      [event.target.name]: event.target.value, 
    });
  };

  const handleChange = (event) => {
    const id = event.target.value;
    setOpcaoSelecionada(id);

    const pessoa = data.find((p) => String(p.idusuarios) === String(id));

    if (pessoa) {
      setFormUpdate({
        nome: pessoa.nome,
        email: pessoa.email,
        idade: pessoa.idade,
        genero: pessoa.genero,
        dataNascimento: pessoa.dataNascimento ? pessoa.dataNascimento.split("T")[0] : "",
        cpf: pessoa.cpf,
      });
    }
  };

  const submitFormularioAdd = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8800/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formAdd), 
      });

      const text = await response.text();

      try {
        const data = JSON.parse(text);
        console.log("Usuário adicionado:", data);
        alert("Usuário adicionado com sucesso!");
      } catch (e) {
        console.warn("Resposta não era JSON válido:", text);
        alert("Usuário adicionado com sucesso! (mas resposta não era JSON)");
      }

      setFormAdd({ nome: "", idade: "", dataNascimento:"", cpf: "", email:"", genero:"" });

    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário");
    }
  };

  const submitFormularioUpdate = async (event) => {
    event.preventDefault();
  
    console.log("Dados enviados para atualização:", formUpdate);
  
    if (!formUpdate.nome) {
      alert("Nome é obrigatório!");
      return;
    }
  
    try {
      const usuarioId = opcaoSelecionada;
  
      const response = await fetch(`http://localhost:8800/usuarios/${usuarioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formUpdate),
      });
  
      const text = await response.text();
  
      try {
        const data = JSON.parse(text);
        console.log("Usuário atualizado:", data);
        alert("Usuário atualizado com sucesso!");
      } catch (e) {
        console.warn("Resposta não era JSON válido:", text);
        alert("Usuário atualizado com sucesso! (mas resposta não era JSON)");
      }
  
      setFormUpdate({ nome: "", idade: "", dataNascimento:"", cpf: "", email:"", genero:"" });
      setOpcaoSelecionada('');
  
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar usuário");
    }
  };

  const submitFormularioDelete = async (event) => {
    event.preventDefault();

    if (!opcaoSelecionada) {
      alert("Selecione um usuário para deletar!");
      return;
    }

    const usuarioId = opcaoSelecionada;

    try {
      const response = await fetch(`http://localhost:8800/usuarios/${usuarioId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Usuário deletado com sucesso!");
        setData(data.filter((pessoa) => pessoa.idusuarios !== usuarioId));
        setFormUpdate({ nome: "", idade: "", dataNascimento:"", cpf: "", email:"", genero:"" });
        setOpcaoSelecionada('');
      } else {
        alert("Erro ao deletar o usuário");
      }
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
      alert("Erro ao deletar usuário");
    }
  };

  return (
    <div>
      <div className="container-add">
        <h1>Adicionar nova pessoa</h1>
        <form onSubmit={submitFormularioAdd}>
          <input type="text" name="nome" value={formAdd.nome} onChange={handleAddChange} placeholder="Nome" />
          <input type="number" name="idade" value={formAdd.idade} onChange={handleAddChange} placeholder="Idade" />
          <input type="date" name="dataNascimento" value={formAdd.dataNascimento} onChange={handleAddChange} />
          <input type="text" name="cpf" value={formAdd.cpf} onChange={handleAddChange} placeholder="Cpf" />
          <input type="email" name="email" value={formAdd.email} onChange={handleAddChange} placeholder="Email" />
          <select name="genero" value={formAdd.genero} onChange={handleAddChange}>
            <option value="">Selecione o gênero</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="nao_binario">Não Binário</option>
            <option value="outro">Outro</option>
          </select>
          <button type="submit">Enviar</button>
        </form>
      </div>

      <div className="container-update">
        <h1>Atualizar ou Deletar pessoa</h1>
        <form>
          <select id="opcoes" value={opcaoSelecionada} onChange={handleChange}>
            <option value="">Selecione uma pessoa</option>
            {data.map((pessoa) => (
              <option key={pessoa.idusuarios} value={pessoa.idusuarios}>
                {pessoa.nome}
              </option>
            ))}
          </select>
          <input type="text" name="nome" value={formUpdate.nome} onChange={handleUpdateChange} placeholder="Nome" />
          <input type="number" name="idade" value={formUpdate.idade} onChange={handleUpdateChange} placeholder="Idade" />
          <input type="date" name="dataNascimento" value={formUpdate.dataNascimento} onChange={handleUpdateChange} />
          <input type="text" name="cpf" value={formUpdate.cpf} onChange={handleUpdateChange} placeholder="Cpf" />
          <input type="email" name="email" value={formUpdate.email} onChange={handleUpdateChange} placeholder="Email" />
          <select name="genero" value={formUpdate.genero} onChange={handleUpdateChange}>
            <option value="">Selecione o gênero</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="nao_binario">Não Binário</option>
            <option value="outro">Outro</option>
          </select>
          <button type="submit" onClick={submitFormularioUpdate}>Atualizar</button>
          <button type="submit" id='btn-delete' onClick={submitFormularioDelete}>Deletar</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
