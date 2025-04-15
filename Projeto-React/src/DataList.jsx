import React, { useEffect, useState } from "react";

const DataList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/usuarios")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

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
                className="btn-delete"
                onClick={() => deleteUser(pessoa.idusuarios)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataList
