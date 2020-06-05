import React from "react"
import { Navbar, Nav, NavItem, NavDropdown, MenuItem ,Form,FormControl,Button} from 'react-bootstrap';
import axios from 'axios';
import {AiOutlineLogout} from "react-icons/ai";
import {RiNotification2Line  } from "react-icons/ri";
import { TiMessages} from "react-icons/ti";
import { BsFillPersonFill} from "react-icons/bs";    
import { logoutEtudiant,getID } from './loginEtudiant/loginEtudiant';
 




export default class HeaderEtudiant extends React.Component {
  constructor(props) {
    super(props);
    this.profil=this.profil.bind(this);
    this.state = {
    
    };
  }
  profil(e){
    e.preventDefault();
    const idetud=getID();
    window.location = '/profiletudiant/'+idetud;

  }
render() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Navbar.Brand onClick={this.profil} ><b>E-learning ESTE  </b> </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{width:80}} />
    <Navbar.Collapse id="responsive-navbar-nav"  className="justify-content-end">
    <Nav className="col-sm-4 row justify-content-center" >  
 
    </Nav>
  
      
      <Nav className="col-sm-auto" >    
      <Nav.Link eventKey={2}  onClick={this.profil} > <BsFillPersonFill/>  Profil  |   </Nav.Link>        
        <Nav.Link eventKey={2}   onClick={() => logoutEtudiant()}> < AiOutlineLogout/> Se déconnecter</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
 
  )}   
  }
