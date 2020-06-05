import React from "react"
import { Navbar, Nav, NavItem, NavDropdown, MenuItem ,Form,FormControl,Button} from 'react-bootstrap';
import axios from 'axios';
import { logoutAdmin} from './loginAdmin/loginAdmin';


export class Header extends React.Component {
  constructor(props) {
    super(props);
    
  }
 
 
    render() {
        return (

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="../listadmin"><b>ESTE </b> </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{width:80}} />
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="mr-auto">
                <Nav.Link href="../listadmin"> Espace admin </Nav.Link>
                <Nav.Link href="../listenseignant">Espace enseignant </Nav.Link>
                <Nav.Link href="../listetudiant">Espace etudiant </Nav.Link>
                <Nav.Link href="../listfiliere">Espace filiere </Nav.Link>
                <Nav.Link href="../listmatiere">Espace matiere </Nav.Link>

                
              </Nav>
              <Nav className="mr-12">           
                <Nav.Link eventKey={2} onClick={() => logoutAdmin()} style={{color:"white"}}> <b>Deconnexion </b></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}