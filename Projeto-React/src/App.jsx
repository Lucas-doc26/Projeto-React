import "./App.css"; // Importa os estilos da aplicação
import DataList from "./DataList.jsx";

function App(){
  function clicked(pessoa){
    console.log("Pessoa cliclou:", pessoa)
  }
  return (
    <DataList clicked={clicked} />
  );
}
export default App