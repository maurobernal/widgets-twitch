import axios from 'axios';
import './Hola.css';
import { useEffect, useState } from 'react';
import TMI from 'tmi.js';
import JoinSignalR from '../../Services/SignalRService';

const Hola = () => {
  const [twitch] = useState(new TMI.Client({ channels: ['maurobernal'] }));
  const [gif, useGif] = useState({url:''});
  const [saludo, useSaludo] = useState('');
  const [usuario, useUsuario] = useState('');
  const [activo, useActivo] = useState(false);
  const palabras = ['hola', 'agua', 'adios', 'chau', 'bye'];
  const {message, activoPopUp} = JoinSignalR();
  useEffect(() => handleTmi(), []);

  const handleTmi = () => {
    twitch.connect().catch((err: any) => console.log(err));
    console.log('tmi conectado');
    twitch.on('message', (_: any, tags:any, message: string) => {
      postMessage('https://extranetapi.gag.com.ar/api/v1/Messages', {
      //postMessage('https://localhost:7136/api/v1/Messages', {
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
      getGif(contains.toString());
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

  const getGif = (query: string) => {
    axios
      .get(
        'https://api.giphy.com/v1/gifs/random?api_key=VXOec9U6npKxCOPef4yWBNsYNQkyNkNw&tag=' +
          query +
          '&rating=g'
      )
      .then((d) => {
        useGif(d.data.data.images.downsized);
      })
      .catch((err) => console.log(err));
  };
  const postMessage = async (url = '', data = {}) => {
    const response = await axios.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }});
    return response.data; };

const appStyles = {
  fontWeight: 700,
  fontSize: "32px",
  color: "rebeccapurple",
  backgroundColor: "#333333",
};

  return (
    <>
      <div className={activo ? '' : 'hidden'}>
        <div className="flex flex-col justify-center items-center align-middle content-center bg-red-100 rounded shadow-sm max-w-80">
          <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-green-700" style={appStyles}>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-orange-400">{usuario}</span>
              <span className="text-sm font-normal text-red-400">{new Date().toLocaleTimeString()+''}</span>
            </div>
            <div className="flex justify-center items-center my-2.5 bg-gray-50 rounded p-2">
              <div className="me-2"></div>
              <img src={gif.url} width="200px" alt={gif.url} />
            </div>
            <span className="flex items-center gap-2 text-sm font-medium text-gray-100 pb-2">
              {saludo}
            </span>
          </div>
        </div>
      </div>

      <div className={activoPopUp ? '' : 'hidden'}>
        <div className="flex flex-col justify-center items-center align-middle content-center bg-red-100 rounded shadow-sm max-w-80">
          <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-green-700" style={appStyles}>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span>{message.subscriber}</span>
              <span className="text-sm font-semibold text-orange-400">{message.displayName}</span>
              <span className="text-sm font-normal text-red-400">{new Date().toLocaleTimeString()+''}</span>
            </div>
            <span className="flex items-center gap-2 text-sm font-medium text-gray-100 pb-2">
              {message.message}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hola;
