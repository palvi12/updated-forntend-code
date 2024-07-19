import { Link, useMatch, useResolvedPath } from "react-router-dom";
//import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";

export default function Navbar() {
  return (
    <nav className="nav navbar">
      <Container>
        <Link to="/" className="site-title">
          <div className="logo"></div>
          <h2>
            <i class="bi bi-hospital px-2"></i>
            Clinic Management
          </h2>
        </Link>
        <ul>
          <CustomLink to="/home">
            <i class="bi bi-house-door-fill px-1"></i> Home
          </CustomLink>
          <CustomLink to="/hospital">
            <i class="bi bi-hospital px-1"></i> Hospital
          </CustomLink>
          <CustomLink to="/patients">
            <i class="bi bi-clipboard2-plus-fill px-1"></i> Patient
          </CustomLink>

          <CustomLink to="/city">
            <i class="bi bi-stoplights-fill px-1"></i> City
          </CustomLink>
          <CustomLink to="/contact">
            <i class="bi bi-telephone-forward-fill px-1"></i> Contact
          </CustomLink>
        </ul>

        
      </Container>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
