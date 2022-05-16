import { Link } from "react-router-dom";
import ("./Home.css")
const Home = () => {
  return (
    <div className="menu">
<nav>
      <h4>Opciones:</h4>
      <div className="menuopcion">
        <Link to="/Confetti">Confetti</Link>
      </div>

</nav>
    </div>
  );
};

export default Home;
