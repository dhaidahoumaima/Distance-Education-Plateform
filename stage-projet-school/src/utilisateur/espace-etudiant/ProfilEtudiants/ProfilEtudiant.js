import React, { Component } from "react";
import {Card,CardDeck,} from "react-bootstrap";
import MenuEtudiant  from '../MenuEtudiant';
import './ProfilEtudiant.css';
import ProfilEditEtudiant from "./ProfilEditEtudiant";
import ProfilCardEtudiant from "./ProfilCardEtudiant";
import HeaderEtudiant from "../HeaderEtudiant";
import Erreur404 from '../../../erreurPage/erreur404'
import { isLoginEtudiant } from '../loginEtudiant/loginEtudiant'

class ProfilEtudiant extends Component {
  render(){
    console.log(isLoginEtudiant())
    if(isLoginEtudiant()){
    return (
      <div >
       <HeaderEtudiant/>
       <MenuEtudiant/>
   
       <div className="Profil0">
            <ProfilEditEtudiant />
            <ProfilCardEtudiant />
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

export default ProfilEtudiant;

