import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='container mx-auto align-middle p-3'>
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
            <li>
              <Link to="/Messages">Messages</Link>
            </li>
          </ul>
        </div>
      </nav>
      <h1>version 2.0</h1>
    </div>
  );
};

export default Home;
