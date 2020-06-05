
import React, { Component } from "react";
import './ProfilEtudiant.css';
import Profil from './profil.png';
import axios from 'axios';
import { loginEtudiant,isLoginEtudiant,logoutEtudiant,getID } from '../loginEtudiant/loginEtudiant';

export class ProfilCardEtudiant extends Component {
  constructor(props) {
    super(props);


    this.state = {etudiant: {},
    
    };
  }

  componentDidMount() {
    const idetud=getID();
    axios.get('http://localhost:5000/etudiant/'+idetud)
      .then(response => {console.log(response.data)
        this.setState({ etudiant: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
 
  render() {
    return (
      <div className="Profil2" style={{width:390}}>
        <div>
          <img  src={Profil} style={{width:300}} className=" imgprofil"/>
          <br></br>
          
          <div className="divprofil">
            <br></br>
          <br></br>
          <div>
              <div>
              <center> <b> 
                {this.state.etudiant.nom}  {this.state.etudiant.prenom}
                </b> </center>
                <b>CIN :{this.state.etudiant.cin} </b>  <br></br>
               <b>CNE :{this.state.etudiant.cne}</b> 
            
               </div>
          </div>
        
           </div>
        </div>
  
  </div>
    );
  }
}

export default ProfilCardEtudiant;
