import { db } from "../db.js";

export const getUsers = (req, res) => {
  const { id } = req.params;
  let q;
  let values = [];

  if (id) {
    q = "SELECT * FROM Pessoa WHERE idusuarios = ?";
    values = [id];
  } else {
    q = "SELECT * FROM Pessoa";
  }

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};




export const createUsers = (req, res) => {
  const {nome, idade, cpf} = req.body;
  if (!nome || !idade || !cpf) {
    return res.status(400).json({ message: "Nome, idade e CPF são obrigatórios." });
  }

  const q = "INSERT INTO Pessoa (nome, idade, cpf) VALUES (?, ?, ?)"

  db.query(q, [nome, idade, cpf], (err, data) => {
    if (err){
      console.log("Erro ao criar o usuário");
      return res.status(500).json(err);//json do erro
    } 
    res.status(200).json({message: "Usuário criado com sucesso!"})
    //tem que ser em json para o front validar 
  })
}

export const updateUser = (req, res) => {
  const {id} = req.params; 
  const {nome, idade, cpf} = req.body;
  

  const q = 'UPDATE Pessoa SET nome = ?, idade = ?, cpf = ? WHERE idusuarios = ?';

  db.query(q, [nome, idade, cpf, id], (err, data) => {
    if (err){
      console.log("Erro ao atualizar o usuário");
      return res.json(err);
    } 
    res.status(200).send("Usuário atualizado com sucesso!")
  })
}

export const deleteUser = (req, res) => {
  console.log(req.params);
  const {id} = req.params; 

  const q = 'DELETE FROM Pessoa WHERE idusuarios = ?';

  db.query(q, [id], (err, data) => {
    if (err){
      console.log("Erro ao deletar o usuário");
      return res.json(err);
    } 
    res.status(200).json({ message: "Usuário deletado com sucesso!" }); 
  })
}