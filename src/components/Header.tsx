import { NavLink } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => (
  <header>
    <div className="header__title">FAKELANDIA JUSTICE DEPARTMENT</div>
    <div className="header__linkContainer">
      <NavLink
        className={({ isActive }) =>
          "header__link" + (!isActive ? "" : "-active")
        }
        to="/"
        id="homeLink"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "header__link" + (!isActive ? "" : "-active")
        }
        to="/misdemeanour"
        id="misdemeanourLink"
      >
        Misdemeanours
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "header__link" + (!isActive ? "" : "-active")
        }
        to="/confess"
        id="confessLink"
      >
        Confess To Us
      </NavLink>
    </div>
  </header>
);

export default Header;
