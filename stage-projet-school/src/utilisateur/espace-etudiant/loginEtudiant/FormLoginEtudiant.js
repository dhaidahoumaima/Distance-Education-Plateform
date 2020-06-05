import React from 'react';
import './loginEtudiant.css';
import { Form, FormGroup, FormControl, Button, FormLabel, FormText ,NavLink,Col}  from 'react-bootstrap';
import Logo from '../../../logo.jpg';
import Axios from 'axios';
import { loginEtudiant,isLoginEtudiant,logoutEtudiant,getID } from './loginEtudiant'
class FormLoginEtudiant extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeCne=this.onChangeCne.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            cne: '',
            password: '',
            id: ""
        };
      }
     
    onChangeCne(e){
        this.setState({
            cne:e.target.value
           
        })
    }
    onChangePassword(e){
        this.setState({
           
            password:e.target.value
        })
    }
      onSubmit(e) {
    if(this.state.cne==this.state.password){
          e.preventDefault()
        const result = Axios.post('http://localhost:5000/loginetudiant/',{cne:this.state.cne}) 
        .then(result=>{
            if(result.data == null) alert("username  incorrect");
            else {
              const idetud=getID();
              loginEtudiant(result.data);
              window.location = '/ProfilETudiant/'+idetud;           

            };
          })
          .catch((error) => {
            window.location = '/loginetudiant';      
          })
          
       
      }else{
        
        window.location = '/loginetudiant';           

      }
    
    }
      
    render(){ 
     
        return (
         
          <div className="body">
          <Form  className="loginbody"   onSubmit={this.onSubmit}>
              <div className="imgcontainer">
                <img  src={Logo} className="Logo"/>
              </div>
            
              <div className="container">
                <label forname="uname"><b>Utilisateur</b></label>
                <input type="text" placeholder="Enter Utilisateur" name="cne" onChange={this.onChangeCne} required/>
            
                <label forname="psw"><b>Mot De Passe</b></label>
                <input type="password" placeholder="Enter Mot De Passe" name="psw" onChange={this.onChangePassword}  required/>
                
                <button type="submit">Login</button>
                
             
                
              </div>
           
        </Form>
        </div>
       
          
            
          );
         
      
    }
 
}

export default FormLoginEtudiant;
