import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css" 

const User = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("ID do usuário:", id); // Verificando se o id está sendo capturado corretamente

    //requisição para buscar os dados do usuário
    fetch(`http://localhost:8800/usuarios/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados do usuário:", data); // Verificando a resposta da API
        if (data && data.length > 0) {
          setUser(data[0]); // Acessando o primeiro item do array
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário:", error);
      });
  }, [id]); // Sempre que o ID mudar, busca os dados novamente

  if (!user) {
    return <div>Carregando...</div>;
  }

  const formatDate = (date) => {
    const [year, month, day] = date.split("T")[0].split("-");
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
  };

  return (
    <div className="user-details">
      <h1>Detalhes do Usuário</h1>
      <div className="user-info">
        <div>
          <strong>Nome:</strong> <span>{user.nome}</span>
        </div>
        <div>
          <strong>Idade:</strong> <span>{user.idade}</span>
        </div>
        <div>
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div>
          <strong>Gênero:</strong> <span>{user.genero}</span>
        </div>
        <div>
          <strong>Data de Nascimento:</strong> <span>{formatDate(user.dataNascimento)}</span>
        </div>
        <div>
          <strong>CPF:</strong> <span>{user.cpf}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
