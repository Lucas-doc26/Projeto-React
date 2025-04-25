import React, { useEffect, useState } from "react";
import "./Crud.css"; 

function Crud() {
  //formulário para add novos usuários
  const [formAdd, setFormAdd] = useState({
    nome: "",
    email: "",
    idade: "",
    genero: "",
    dataNascimento: "",
    cpf: ""
  });

  //formulário para att usuários
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

  //pego os usuários do banco de dados
  useEffect(() => {
    fetch("http://localhost:8800/usuarios")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  //chamada quando algum campo do formulário de add é alterado
  const handleAddChange = (event) => {
    setFormAdd({
      ...formAdd,
      [event.target.name]: event.target.value, 
    });
  };

  //chamada quando algum campo do formulário de att é alterado
  const handleUpdateChange = (event) => {
    setFormUpdate({
      ...formUpdate,
      [event.target.name]: event.target.value, 
    });
  };

  //chamada para retornar os dados do usuário
  const handleChange = (event) => {
    const id = event.target.value;
    setOpcaoSelecionada(id);

    //pego o usuário pelo id
    const pessoa = data.find((p) => String(p.idusuarios) === String(id));

    if (pessoa) {
      setFormUpdate({
        nome: pessoa.nome,
        email: pessoa.email,
        idade: pessoa.idade,
        genero: pessoa.genero,
        dataNascimento: pessoa.dataNascimento ? pessoa.dataNascimento.split("T")[0] : "", //converto para o formato certo
        cpf: pessoa.cpf,
      });
    }
  };

  //envio os dados para o banco de dados
  const submitFormularioAdd = async (event) => {
    event.preventDefault();

    const { nome, email, idade, genero, dataNascimento, cpf } = formAdd;

    if (!nome || !email || !idade || !genero || !dataNascimento || !cpf) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8800/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formAdd), 
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
    
      const data = await response.json(); // Aqui já tratamos como JSON direto
      console.log("Usuário adicionado:", data);
      alert("Usuário adicionado com sucesso!");
      window.location.reload();
      
      //limpar o formulário após o envio
      setFormAdd({ nome: "", idade: "", dataNascimento:"", cpf: "", email:"", genero:"" });

    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário");
    }
  };

  //envio os dados para o banco de dados para atualizar o usuário
  const submitFormularioUpdate = async (event) => {
    event.preventDefault();
  

    const { nome, email, idade, genero, dataNascimento, cpf } = formUpdate;

    if (!opcaoSelecionada) {
      alert("Selecione uma pessoa para atualizar!");
      return;
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !email || !idade || !genero || !dataNascimento || !cpf) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
  
    try {
      const usuarioId = opcaoSelecionada;
      
      // envio os dados para att o usuário pelo seu id
      const response = await fetch(`http://localhost:8800/usuarios/${usuarioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formUpdate),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
    
      const data = await response.json();
      console.log("Usuário atualizado:", data);
      alert("Usuário atualizado com sucesso!");
      window.location.reload();
      
      // limpa o formulário após o envio
      setFormUpdate({ nome: "", idade: "", dataNascimento:"", cpf: "", email:"", genero:"" });
      setOpcaoSelecionada('');
  
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar usuário");
    }
  };

  //deletar o usuário
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

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
    
      setData(data.filter((pessoa) => pessoa.idusuarios !== usuarioId));

      //limpa o formulário após o envio
      setFormUpdate({ nome: "", idade: "", dataNascimento:"", cpf: "", email:"", genero:"" });
      setOpcaoSelecionada('');

      alert("Usuário deletado com sucesso!");
      window.location.reload();

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
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Não binário">Não Binário</option>
            <option value="Outro">Outro</option>
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
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Não binário">Não Binário</option>
            <option value="Outro">Outro</option>
          </select>
          <button type="submit" onClick={submitFormularioUpdate}>Atualizar</button>
          <button type="submit" id='btn-delete' onClick={submitFormularioDelete}>Deletar</button>
        </form>
      </div>
    </div>
  );
}

export default Crud;
