import { NavLink } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => (
  <header>
    <div className="header__title">FAKELANDIA JUSTICE DEPARTMENT</div>
    <div className="header__linkContainer">
      <NavLink className="header__link" to="/">
        Home
      </NavLink>
      <NavLink className="header__link" to="/misdemeanour">
        Misdemeanours
      </NavLink>
      <NavLink className="header__link" to="/confess">
        Confess To Us
      </NavLink>
    </div>
  </header>
);

export default Header;
