import { Link } from "react-router-dom";
import("./Home.css");
const Home = () => {
  return (
    <div className="menu">
      <nav>
        <h4>Opciones:</h4>
        <div className="menuopcion">
          <ul>
            <li>
              <Link to="/Confetti">Confetti</Link>
            </li>
            <li>
              <Link to="/Fireworks">Fireworks</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Home;
