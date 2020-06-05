import React from 'react';
import './acceuil.css';
import { Button } from 'react-bootstrap';




class Acceuil extends React.Component{
    constructor(props) {
        super(props);
        this.onclickadmin=this.onclickadmin.bind(this);
        this.onclicketudiant=this.onclicketudiant.bind(this);
        this.onclickenseignant=this.onclickenseignant.bind(this);

        this.state = {
        
        };
      }
      onclickadmin(e){
        e.preventDefault();
       
        window.location = '/loginadmin';
    
      }
      onclicketudiant(e){
        e.preventDefault();
       
        window.location = '/loginetudiant';
    
      }
      onclickenseignant(e){
        e.preventDefault();
       
        window.location = '/loginenseignant';
    
      }
    render(){

  return (
          <div className="bodyacceuil">
               <br></br>
               <br></br>
               <br></br>
                <div className="buttonloginacceuil">
                   <div className="buttonetudiant"> 
                        <p style={{color:"white"}}><b>Est vous un etudiant dans ESTE ?</b> </p>
                        <button className="btnlogin" onClick={this.onclicketudiant} href="./loginetudiant"><b>Login</b></button>
                   </div>
                   <div className="buttonenseignant"> 
                        <p style={{color:"white"}}><b>Est vous un enseignant dans ESTE ?</b></p>
                        <button className="btnlogin" onClick={this.onclickenseignant} href="./loginenseignant"><b>Login</b></button>
                   </div>
                   <div className="buttonadmin"> 
                        <p style={{color:"white"}}><b>Est vous un administateur dans ESTE ?</b></p>
                        <button className="btnlogin" onClick={this.onclickadmin} href="./loginadmin"><b>Login</b> </button>
                   </div>
                </div>
            </div>
        
        )
    }
    

}
export default Acceuil;