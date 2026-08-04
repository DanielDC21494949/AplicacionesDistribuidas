import Saludo from "./components/Saludo";
import { useState } from "react";



function App() {


  const [contador, setContador] = useState(0);

    return (

       <>
    <h1>Contador</h1>

    <h2>{contador}</h2>

    <button onClick={() => setContador(contador + 1)}>
    Incrementar
    
    
    </button>
  </>
  

);

}

export default App;