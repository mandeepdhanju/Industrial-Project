import { Link } from "react-router-dom";
import logo from "../images/logo_white.png";

function Header() {
  return (
    <div className="header">
      <nav>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        <div className="navLinks">
          <Link className="navLink" to="/organization">
            ORGANIZATIONS
          </Link>
          <Link className="navLink" to="/search">
            SEARCH
          </Link>
          <Link className="navLink" to="/Report">
            REPORTS
          </Link>
          <Link className="navLink" to="/upload">
            BULK UPLOAD
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
