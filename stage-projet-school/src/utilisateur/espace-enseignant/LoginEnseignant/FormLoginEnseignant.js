import React from 'react';
import './loginEnseignant.css';
import { Form, FormGroup, FormControl, Button, FormLabel, FormText ,NavLink,Col}  from 'react-bootstrap';
import Logo from '../../../logo.jpg';
import Axios from 'axios';
import { loginEnseignant,isLoginEnseignant,logoutEnseignant,getID } from './loginEnseignant'

class FormLoginEnseignant extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeCode_ens=this.onChangeCode_ens.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            code_ens: '',
            password: '',
            id: ""
        };
      }
     
    onChangeCode_ens(e){
        this.setState({
            code_ens:e.target.value
           
        })
    }
    onChangePassword(e){
        this.setState({
           
            password:e.target.value
        })
    }
      onSubmit(e) {
    if(this.state.code_ens==this.state.password){
          e.preventDefault()
        const result = Axios.post('http://localhost:5000/loginEnseignant/',{code_ens:this.state.code_ens}) 
        .then(result=>{
            if(result.data == null) alert("username  incorrect");
            else {
              const idens=getID();
              loginEnseignant(result.data);
              window.location = '/ProfilEnseignant/'+idens; 
                       };
          });
       
      }else{
        console.log( " password and username incorrect")
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
                <input type="text" placeholder="Enter Utilisateur" name="code_ens" onChange={this.onChangeCode_ens} required/>
            
                <label forname="psw"><b>Mot De Passe</b></label>
                <input type="password" placeholder="Enter Mot De Passe" name="psw" onChange={this.onChangePassword}  required/>
                
                <button type="submit">Login</button>
                
             
                
              </div>
           
        </Form>
        </div>
       
          
            
          );
    }
 
}

export default FormLoginEnseignant;
