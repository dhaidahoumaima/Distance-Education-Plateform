import React from 'react';
import './loginAdmin.css';
import { Form, FormGroup, FormControl, Button, FormLabel, FormText ,NavLink,Col}  from 'react-bootstrap';
import Logo from '../../logo.jpg';
import Axios from 'axios';
import { loginAdmin,isLoginAdmin,logoutAdmin}  from './loginAdmin'

class FormLoginAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeCode_admin=this.onChangeCode_admin.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state = {
            cne: '',
            password: '',
            id: ""
        };
      }
     
      onChangeCode_admin(e){
        this.setState({
            code_admin:e.target.value
           
        })
    }
    onChangePassword(e){
        this.setState({
           
            password:e.target.value
        })
    }
      onSubmit(e) {
    if(this.state.code_admin==this.state.password){
          e.preventDefault()
        const result = Axios.post('http://localhost:5000/loginadmin/',{code_admin:this.state.code_admin}) 
        .then(result=>{
            if(result.data == null) alert("username  incorrect");
            else {
              loginAdmin(result.data);
              window.location = '/listFiliere';           
            };
          });
       
      }else{
        console.log("username and password incorrect");
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
                <input type="text" placeholder="Enter Utilisateur" name="cne" onChange={this.onChangeCode_admin} required/>
            
                <label forname="psw"><b>Mot De Passe</b></label>
                <input type="password" placeholder="Enter Mot De Passe" name="psw" onChange={this.onChangePassword}  required/>
                
                <button type="submit">Login</button>
                
             
                
              </div>
           
        </Form>
        </div>
       
          
            
          );
    }
 
}

export default FormLoginAdmin;
