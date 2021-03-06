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

          <Link className="navLink dropdown" to="/dropdown">
            DROPDOWNS
            <ul className="submenu">
              <li>
                <Link className="navLink" to="/community">
                  Community
                </Link>
              </li>
              <li>
                <Link className="navLink" to="/employeeCount">
                  Number of Employees
                </Link>
              </li>
              <li>
                <Link className="navLink" to="/category">
                  Category
                </Link>
              </li>
            </ul>
          </Link>

          <Link className="navLink" to="/search">
            SEARCH
          </Link>
          <Link className="navLink" to="/upload">
            BULK UPLOAD
          </Link>
          <Link className="navLink" to="/uploadws">
            Bulk Upload v2
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
