import { useEffect } from 'react';
import { useState } from 'react';
import './Help.css';
import { FaRegGrinSquintTears, FaPhotoVideo } from 'react-icons/fa';
import TMI from 'tmi.js';

const Help = () => {

  const [twitch] = useState(new TMI.Client({ channels: ['maurobernal'] }));
  const handlerLoad = () => {
    twitch.connect();
    console.log('Cliente conectado');

    twitch.on('message', (channel, tags, message) => {
      if (!message.includes('https://maurobernal.com.ar/twitch/help')) return;

      console.log(message);
    });

    return () => {
      twitch.disconnect();
    };
  };

  useEffect(handlerLoad, []);

  return (
    <div className="Help">
      <div className="Titulo">
        <h3>Comandos para el stream!</h3>
      </div>
    
      <div className="Recuadro">
        <div className="Head">
          <FaRegGrinSquintTears size={15} /> !Confetti
        </div>
        <div className="Cuerpo">
           Dale alegría al stream.
          <span> Tira confettis</span>
        </div>
      </div>

      <div className="Recuadro">
        <div className="Head">
          <FaPhotoVideo size={15} /> !Foto
        </div>
        <div className="Cuerpo">
          Captura el stream.
          <span> Mira que caripela</span>
        </div>
      </div>
     
    </div>
  );
};

export default Help;
