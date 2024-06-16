import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { adminMenu } from "./adminmenuConst";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container">
      <Navbar fixed="top" color="dark" dark expand="sm">
        <NavbarBrand>League Evolution</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="navbar-nav ms-auto" navbar>
            {adminMenu.map((item, index) => (
              <NavItem key={index}>
                <NavLink href={item.link}>{item.name}</NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AdminMenu;
