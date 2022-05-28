import axios from 'axios';
import './Hola.css';
import { useEffect, useState } from 'react';
import TMI from 'tmi.js';

const Hola = () => {
  const url='https://api.giphy.com/v1/gifs/random?api_key=VXOec9U6npKxCOPef4yWBNsYNQkyNkNw&tag=hola&rating=g';
  const [twitch] = useState(new TMI.Client({ channels: ['maurobernal'] }));
  const [gif,useGif]=new useState('');
  const [saludo,useSaludo]=new useState('');
  const [usuario,useUsuario]=new useState('');
  const [activo,useActivo]=new useState(false);
  
  let handleLoad=()=>{
    twitch.connect().catch(err=>console.log(err));
    console.log('Cliente conectado');

    twitch.on('message', (channel, tags, message) => {
      console.log(message);
      if ( !message.toString().toLowerCase().includes('hola') ) return;
      useUsuario(tags.username +':');
      useSaludo(message);
      handleGif();
      setTimeout(() => {
        useActivo(true);
        console.log('a');
      }, 2000);

      setTimeout(() => {
        useActivo(false);
        console.log('d');
      }, 7000);
    });

    return () => {
      twitch.disconnect();
    };
  };

  let handleGif=()=>{
    axios.get(url)
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

