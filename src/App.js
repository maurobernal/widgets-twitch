import './App.css';
import TMI from 'tmi.js';
import { useEffect } from 'react';
import { useState } from 'react';

const App = function App() {
  const [valor, UseValor] = useState(5);
  const handlerButton = () => {
    UseValor(valor + 1);
  };

  const handlerComando=()=>{
    console.log('vino comando desde el chat');
    handlerButton();
  };

  const handlerLoad = () => {
    //TMI Twitch
    const client = new TMI.Client({ channels: ['maurobernal'] });

    client.connect();
    console.log('Cliente conectado');

    client.on('message', (channel, tags, message) => {
      if (tags['display-name'] !== 'maurobernal' || !message.startsWith('!ejemplo'))
        return;

      handlerComando();
        
    });
  };

  useEffect(handlerLoad, []);

  return (
    <div className="App">
      Hola Mundo
      <h1>valor: {valor}</h1>
      <button onClick={handlerButton}> Sumar</button>
    </div>
  );
};

export default App;
