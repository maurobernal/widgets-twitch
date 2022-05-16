import { useState } from "react";
import { useEffect } from "react";
import ConfettiDOM from "react-dom-confetti";
import TMI from "tmi.js";
import "./Confetti.css";
//https://daniel-lundin.github.io/react-dom-confetti/

const Confetti = () => {
  const [audio] = useState(new Audio("/Audios/confetti.mp3"));
  const [confetti_activo, UseEstadoConfetti] = useState(false);
  const [mensaje, UseMensaje] = useState("");
  const [twitch] = useState(new TMI.Client({ channels: ["maurobernal"] }));

  //metodos
  const handlerActivarConfetti = () => {
    const intervalo = setInterval(() => {
      console.log("Cambiar  el estado de confetti");

      audio.play();
      UseEstadoConfetti(true);
      setTimeout(() => {
        UseEstadoConfetti(false);
      }, 1000);
    }, 1100);

    setTimeout(() => {
      clearInterval(intervalo);
    }, 3500);
  };

  const handlerButton = () => handlerActivarConfetti();

  const handlerLoad = () => {
    twitch.connect();
    console.log("Cliente conectado");

    twitch.on("message", (channel, tags, message, self) => {
      console.log(message);
      UseMensaje(message);
      if (
        // tags["display-name"] != "maurobernal" ||
        !message.startsWith("!confetti")
      )
        return;
      UseMensaje("Comando:" + message);
      handlerButton();
    });

    return () => {
      twitch.disconnect();
    };
  };

  useEffect(handlerLoad, []);

  return (
    <>
      <>
        <div className="confetti">
          <ConfettiDOM
            className="confetti"
            active={confetti_activo}
            config={config}
          />
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
  colors: ["#000", "#f00"],
};

export default Confetti;
