import { useState } from "react";
import { useEffect } from "react";
import Confetti from "react-dom-confetti";
import TMI from "tmi.js";
import "./ConfettiComponent.css";

const ConfettiComponent = () => {
  
  
  const handlerActivarConfetti = () => {
    console.log("Activar el confetti");
    UseEstadoConfetti(!confetti_activo);

  };

  const [confetti_activo, UseEstadoConfetti] = useState(false);
  const [confetti_height, UseEstadoHeight] = useState(500);
  const [mensaje, UseMensaje] = useState("");
  
  
  const handlerButton = () => {
    console.log("cambiando estado", confetti_activo);
    UseEstadoConfetti(!confetti_activo);
    UseEstadoHeight(0);
  };

  const handlerLoad = () => {
    //TMI Twitch
    const client = new TMI.Client({ channels: ["maurobernal"] });

    client.connect();
    console.log("Cliente conectado");

    client.on("message", (channel, tags, message, self) => {
      console.log(message);
      UseMensaje(message);
      if (
        // tags["display-name"] != "maurobernal" ||
        !message.startsWith("!confetti")
      )
        return;
        UseMensaje("Comando:"+message);
        UseEstadoConfetti(!confetti_activo);

    });

    return () => {
      client.disconnect();
    };
  };

  useEffect(handlerLoad, []);

  return (
    <>
      <>
        <div>
          <h5>Estado: {confetti_activo.toString()}</h5>
          <h5>Mensaje: {mensaje.toString()}</h5>

          <button onClick={handlerButton}> Cambiar</button>
        </div>
        <div>
          <Confetti active={confetti_activo}   config={{
          angle: 90,
          spread: 360,
          startVelocity: 40,
          elementCount: 70,
          dragFriction: 0.12,
          duration: 3000,
          stagger: 3,
          width: "40px",
          height: "50px",
          perspective: "500px",
          colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
        }}/>
        </div>
      </>
    </>
  );
};

export default ConfettiComponent;
