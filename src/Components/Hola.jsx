import axios from 'axios';
import './Hola.css';
import { useEffect, useState } from 'react';
import TMI from 'tmi.js';

const Hola = () => {
  const [twitch] = useState(new TMI.Client({ channels: ['maurobernal'] }));
  const [gif,useGif]=new useState('');
  const [saludo,useSaludo]=new useState('');
  const [usuario,useUsuario]=new useState('');
  const [activo,useActivo]=new useState(false);
  const palabras= ['hola','agua','adios','chau','bye'];
  
  let handleLoad=()=>{
    twitch.connect().catch(err=>console.log(err));
    console.log('Cliente conectado');

    twitch.on('message', (channel, tags, message) => {
      const contains = palabras.find(element => 
        message.toLowerCase().includes(element)
      );
      console.log(contains);
      if ( contains==undefined ) return;

      useUsuario(tags.username +':');
      useSaludo(message);
      console.log('buscando',contains);
      handleGif(contains.toString());
      setTimeout(() => {
        useActivo(true);
      }, 2000);

      setTimeout(() => {
        useActivo(false);
      }, 7000);
    });

    return () => {
      twitch.disconnect();
    };
  };

  let handleGif=(query)=>{
    console.log('https://api.giphy.com/v1/gifs/random?api_key=VXOec9U6npKxCOPef4yWBNsYNQkyNkNw&tag='+query+'&rating=g');
    axios.get('https://api.giphy.com/v1/gifs/random?api_key=VXOec9U6npKxCOPef4yWBNsYNQkyNkNw&tag='+query+'&rating=g')
      .then( d=> 
      { 
        useGif(d.data.data.images.downsized);
        console.log(d.data.data.images.downsized);
      }      ).catch(err=>console.log(err));
  };

  useEffect(() =>  handleLoad(), []);

  return(

    <div className={activo?'Hola':'Hola-none' }  >
      <div className='gif'><img src={gif.url} width="200px" alt={gif}/></div>
      <div className='Mensaje'>
        <span>{usuario}</span>
        <p>{saludo}</p>
      </div>
   
    </div>
  );
};

export default Hola;

