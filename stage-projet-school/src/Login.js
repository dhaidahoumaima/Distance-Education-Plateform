import React from 'react';
import './Login.css';
import { Form, FormGroup, FormControl, Button, FormLabel, FormText ,NavLink,Col}  from 'react-bootstrap';
import Logo from './logo.jpg';
//import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
     
    
      submitLogin(e) {}
    
    render(){
        return (
          <div className="body">
          <Form  className="loginbody">
              <div className="imgcontainer">
                <img  src={Logo} className="Logo"/>
              </div>
            
              <div className="container">
                <label forname="uname"><b>Utilisateur</b></label>
                <input type="text" placeholder="Enter Utilisateur" name="uname" required/>
            
                <label forname="psw"><b>Mot De Passe</b></label>
                <input type="password" placeholder="Enter Mot De Passe" name="psw" required/>
                 <div className="container">
                 <Col sm={12}>
                      <Form.Check type="radio" label="  Etudiant" name="formVerticalRadios" id="formVerticalRadios1"inline />
                      <Form.Check type="radio" label="  Enseignant" name="formVerticalRadios" id="formVerticalRadios2" inline />
                         
                 </Col>
                      
                      
                 </div>  
                <button type="submit">Login</button>
                
             
                
              </div>
           
        </Form>
        </div>
       
          
            
          );
    }
 
}

export default Login;
