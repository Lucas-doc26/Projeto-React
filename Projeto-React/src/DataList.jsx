import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o useNavigate

const DataList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Cria a função de navegação

  useEffect(() => {
    fetch("http://localhost:8800/usuarios")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  // Função para navegação
  function abrirNovaPagina(id) {
    navigate(`/usuarios/${id}`); // Navega para a página de detalhes do usuário
  }

  return (
    <div className="container-datalist">
      <h1>Lista de Usuários</h1>
      <div className="user-list">
        {data.map((pessoa) => (
          <div key={pessoa.idusuarios} className="user">
            <div>
              <strong>Nome:</strong> {pessoa.nome}
            </div>
            <div>
              <strong>Idade:</strong> {pessoa.idade}
            </div>
            <div>
              <strong>Email:</strong> {pessoa.email}
            </div>

            <div className="div-btn">
              <button
                className="btn-ver-mais"
                onClick={() => abrirNovaPagina(pessoa.idusuarios)} // Passa o id do usuário
              >
                Ver mais
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataList;
