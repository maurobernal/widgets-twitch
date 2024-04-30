import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import messageInterface from '../interfaces/messageInterface';

export default function JoinSignalR() {
  const [data, setData] = useState({
    message:{message:'',username:''},
    activoPopUp:false,
  });

  const startConnection = async () => {


    const conn = new HubConnectionBuilder()
      //.withUrl('https://localhost:7136/hub')
      .withUrl('https://extranetapi.gag.com.ar/hub')
      .build();
    try {
      conn.on('message', async (data: messageInterface) => {
        console.log(data);
        setTimeout(() => {
          setData(prevData => ({
            ...prevData,
            message: data,
            activoPopUp: true
          }));
        }, 2000);

        setTimeout(() => {
          setData(prevData => ({
            ...prevData,
            message: data,
            activoPopUp: false
          }));
        }, 9000);
      });

      conn.onclose(async a => {
        console.log(a);
        setData(prevData => ({
          ...prevData,
          logHub: 'Se ha perdido la conexión con el servidor.',
        }));

        setTimeout(() => {
          console.log('Retrasado por 1 segundo.');
          window.location.reload();
        }, 3000);

        await conn.start();
      });

      if (conn.state === 'Disconnected') {
        await conn.start();
      }
    } catch (error) {
      setData(prevData => ({
        ...prevData,
        logHub: 'HUB:' + error,
      }));

      setTimeout(() => {
        console.log('Retrasado por 1 segundo.');
        window.location.reload();
      }, 3000);
    }
  };

  useEffect(() => {
    startConnection();
  }, []);

  return data;
}

