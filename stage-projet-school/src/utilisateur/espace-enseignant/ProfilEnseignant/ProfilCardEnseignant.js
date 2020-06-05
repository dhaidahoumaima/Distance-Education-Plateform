import React, { Component } from "react";
import './ProfilEnseignant.css';
import Profil from './profil.jpg';
import axios from 'axios';
import { loginEnseignant,isLoginEnseignant,logoutEnseignant,getID } from '../LoginEnseignant/loginEnseignant';

export class ProfilCardEnseignant extends Component {
  constructor(props) {
    super(props);


    this.state = {enseignant: {},
    
    };
  }

  componentDidMount() {
    const ideens=getID();
    axios.get('http://localhost:5000/enseignant/'+ideens)
      .then(response => {console.log(response.data)
        this.setState({ enseignant: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    return (
      <div className="Profil2" style={{width:390}}>
        <div>
          <img  src={Profil} style={{width:250}} className=" imgprofil"/>
          <br></br>
          
          <div className="divprofil">
            <br></br>
          <br></br>
          <div>
              <div>
              <center> <b> 
                {this.state.enseignant.nom}  {this.state.enseignant.prenom}
                </b> </center>
                <b>CIN :{this.state.enseignant.cin} </b>  <br></br>
               <b>CNE :{this.state.enseignant.code_ens}</b> 
            
            
               </div>
          </div>
          </div>
            
        </div>
  
  </div>
    );
  }
}

export default ProfilCardEnseignant;
