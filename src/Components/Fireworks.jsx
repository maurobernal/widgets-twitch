import { FireworksJS } from 'fireworks-js/dist/react'
import { CSSProperties } from 'react'


const Fireworks = () => {

  const options = {
    speed: 3
  }

  const style = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: '#000'
  }

  return <Fireworks options={options} style={style} />
}
export default Fireworks