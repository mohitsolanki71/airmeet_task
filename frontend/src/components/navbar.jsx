import "./navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div id="navbar">
      <div id="navbar_icon">
        <img src="https://cdn-icons-png.flaticon.com/512/732/732222.png"></img>
        <Link className="link" to={"/"}>
          <h1 id="name">𝓐𝓭𝓶𝓲𝓷</h1>
        </Link>
      </div>
      <div>
        <Link className="right_icons" to={"/favorites"}>
          𝐹𝒶𝓋𝑜𝓇𝒾𝓉𝑒
        </Link>
      </div>
    </div>
  );
};
