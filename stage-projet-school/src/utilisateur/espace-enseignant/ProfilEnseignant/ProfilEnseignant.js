import React, { Component } from "react";
import MenuEnseignant  from '../MenuEnseignant';
import './ProfilEnseignant.css';
import ProfilEditEnseignant from "./ProfileditEnseignant";
import ProfilCardEnseignant from "./ProfilCardEnseignant";
import HeaderEnseignant from "../HeaderEnseignant";
import Erreur404 from '../../../erreurPage/erreur404'
import { isLoginEnseignant } from '../LoginEnseignant/loginEnseignant'
class ProfilEnseignant extends Component {
  render() {
    if(isLoginEnseignant()){
    return (
      <div >
       <HeaderEnseignant/>
       <MenuEnseignant/>
   
       <div className="Profil0">
            <ProfilEditEnseignant />
            <ProfilCardEnseignant/>
        </div>
     
      </div>
    );
  }else{
    return(
      <Erreur404/>
    );
  }
  }
} 
export default ProfilEnseignant;


