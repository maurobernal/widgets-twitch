import { Link } from 'react-router-dom';
import('./Home.css');
const Home = () => {
  return (
    <div className="menu">
      <nav>
        <h4>Opciones:</h4>
        <div className="menuopcion">
          <ul>
            <li>
              <Link to="/Help">Help</Link>
            </li>
            <li>
              <Link to="/Confetti">Confetti</Link>
            </li>
            <li>
              <Link to="/Firework">Firework</Link>
            </li>
            <li>
              <Link to="/Hola">Hola</Link>
            </li>
          </ul>
        </div>
      </nav>
      <h1>version 1.0</h1>
    </div>
  );
};

export default Home;
