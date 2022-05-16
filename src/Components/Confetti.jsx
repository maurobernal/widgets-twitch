import { useState } from "react";
import { useEffect } from "react";
import ConfettiDOM from "react-dom-confetti";
import TMI from "tmi.js";
import useSound from 'use-sound'
import mySound from '../Audios/confetti.mp3'
import "./Confetti.css";
//https://daniel-lundin.github.io/react-dom-confetti/



const Confetti = () => {
  const [playSound] = useSound(mySound)
  
  
  const handlerActivarConfetti = () => {
    console.log("Activar el confetti");
    playSound();
    UseEstadoConfetti(!confetti_activo);

  };

  const [confetti_activo, UseEstadoConfetti] = useState(false);
  const [mensaje, UseMensaje] = useState("");
  
  
  const handlerButton = () => {
    console.log("cambiando estado de:", confetti_activo," a", !confetti_activo);
    playSound();
    UseEstadoConfetti(!confetti_activo);
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
        playSound();
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
     
          <button onClick={handlerButton}> Cambiar</button>
        </div>
        <div className="confetti">
          <ConfettiDOM className="confetti" active={confetti_activo}   config={config}/>
        </div>
      </>
    </>
  );
};


const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#000", "#f00"]
};

export default Confetti;
