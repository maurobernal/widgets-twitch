import axios from 'axios';
import './Hola.css';
import { useEffect, useState } from 'react';
import TMI from 'tmi.js';

const Hola = () => {
  const [twitch] = useState(new TMI.Client({ channels: ['maurobernal'] }));
  const [gif, useGif] = new useState('');
  const [saludo, useSaludo] = new useState('');
  const [usuario, useUsuario] = new useState('');
  const [activo, useActivo] = new useState(false);
  const palabras = ['hola', 'agua', 'adios', 'chau', 'bye'];

  let handleLoad = () => {
    twitch.connect().catch((err) => console.log(err));
    console.log('Cliente conectado');
    twitch.on('message', (_, tags, message) => {
      postData('https://extranetapi.gag.com.ar/api/v1/Messages', {
        id: tags.id,
        roomid:tags['room-id'],
        typeentity:tags['message-type'],
        username:tags.username,
        subscriber:tags.subscriber,
        displayname:tags['display-name'],
        badge:tags['badge-info-raw'],
        color:tags.color,
        message:message
      }).then(data => console.log(data));

      const contains = palabras.find((element) =>
        message.toLowerCase().includes(element)
      );

      if (contains == undefined) return;

      useUsuario(tags.username + ':');
      useSaludo(message);
      console.log('buscando', contains);
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

  let handleGif = (query) => {
    console.log(
      'https://api.giphy.com/v1/gifs/random?api_key=VXOec9U6npKxCOPef4yWBNsYNQkyNkNw&tag=' +
        query +
        '&rating=g'
    );
    axios
      .get(
        'https://api.giphy.com/v1/gifs/random?api_key=VXOec9U6npKxCOPef4yWBNsYNQkyNkNw&tag=' +
          query +
          '&rating=g'
      )
      .then((d) => {
        useGif(d.data.data.images.downsized);
        console.log(d.data.data.images.downsized);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => handleLoad(), []);

  return (
    <div className={activo ? 'Hola' : 'Hola-none'}>
      <div className="gif">
        <img src={gif.url} width="200px" alt={gif} />
      </div>
      <div className="Mensaje">
        <span>{usuario}</span>
        <p>{saludo}</p>
      </div>
    </div>
  );
};

const postData = async (url = '', data = {}) => {
  // Default options are marked with *
  console.log(data);
  console.log(JSON.stringify(data));

  const response = await axios.post(url, data, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }});
  return response.data; };

export default Hola;
