import "./navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div id="navbar">
      <div id="navbar_icon">
        <img src="https://cdn-icons-png.flaticon.com/512/732/732222.png"></img>
        <Link className="link" to={"/"}>
          <h1 id="name">ππ­πΆπ²π·</h1>
        </Link>
      </div>
      <div>
        <Link className="right_icons" to={"/favorites"}>
          πΉπΆππππΎππ
        </Link>
      </div>
    </div>
  );
};
