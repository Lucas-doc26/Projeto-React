import { db } from "../db.js";

//pego todos os usuários 
export const getUsers = (req, res) => {
  const { id } = req.params;
  let q;
  let values = [];

  //se o id for passado, pego o usuário pelo id
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

//criando um usuario novo
export const createUsers = (req, res) => {
  const {nome, idade, dataNascimento, cpf, email, genero} = req.body;

  //verificações
  if (!nome || !idade || !cpf || !dataNascimento || !email || !genero) {
    return res.status(400).json({ message: "Todos os itens são obrigatórios." });
  }

  const q = "INSERT INTO Pessoa (nome, idade, dataNascimento, cpf, email, genero) VALUES (?, ?, ?, ?, ?, ?)"

  db.query(q, [nome, idade, dataNascimento, cpf, email, genero], (err, data) => {
    if (err){
      console.log("Erro ao criar o usuário");
      return res.status(500).json(err);//json do erro
    } 
    res.status(200).json({message: "Usuário criado com sucesso!"})
    console.log("Usuário criado com sucesso!")
    //tem que ser em json para o front validar 
  })
}

export const updateUser = (req, res) => {
  const {id} = req.params; 
  const {nome, idade, dataNascimento, cpf, email, genero} = req.body;

  //verificações
  if (!nome || !idade || !cpf || !dataNascimento || !email || !genero) {
    return res.status(400).json({ message: "Todos os itens são obrigatórios." });
  }
  
  const q = 'UPDATE Pessoa SET nome = ?, idade = ?, dataNascimento = ?, cpf = ? , email = ?, genero = ? WHERE idusuarios = ?';

  db.query(q, [nome, idade, dataNascimento, cpf, email, genero, id], (err, data) => {
    if (err){
      console.error("Erro ao atualizar o usuário:", err);
      return res.status(500).json({ error: "Erro ao atualizar o usuário." });
    } 
    res.status(200).json({message: "Usuário atualizado com sucesso!"})
  })
}

export const deleteUser = (req, res) => {
  console.log(req.params);
  const {id} = req.params; 

  if (!id) {
    return res.status(400).json({ message: "Id é obrigatório." });
  }
  
  const q = 'DELETE FROM Pessoa WHERE idusuarios = ?';

  db.query(q, [id], (err, data) => {
    if (err){
      console.log("Erro ao deletar o usuário");
      return res.json(err);
    } 
    res.status(200).json({ message: "Usuário deletado com sucesso!" }); 
  })
}