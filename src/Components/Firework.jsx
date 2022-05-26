import { Fireworks } from 'fireworks-js/dist/react';


const Firework = () => {

  const options = {
    speed: 3
  };

  const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: '#000'
  };

 
  return <Fireworks options={options} style={style} />;
};
export default Firework;