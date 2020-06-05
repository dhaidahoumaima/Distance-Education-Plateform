import React from "react";
import {Table} from 'react-bootstrap';
import './Matiereetudiant.css';
import axios from 'axios';
import { FaUserEdit, FaFileDownload } from 'react-icons/fa';
import MenuEtudiant  from '../MenuEtudiant';
import HeaderEtudiant from "../HeaderEtudiant";
import Erreur404 from '../../../erreurPage/erreur404'
import { isLoginEtudiant } from '../loginEtudiant/loginEtudiant'
const Activite= props => (
  <tr>
  <td>{props.activite.nom_activite}</td>
  <td>{props.activite.type_activite}</td>
  <td>{props.activite.description}</td>
  <td>
    <a href="" onClick={() => { props.download(props.activite.fichier) }}> <FaFileDownload /> </a>
  </td></tr>
)
 export default class MatiereEtudiant extends React.Component {
  constructor(props) {
     super(props);
    this.download = this.download.bind(this)
   
    this.state = {activites: [],  
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.id)
    axios.get('http://localhost:5000/activite/findBymatiere/'+ this.props.match.params.id)
      .then(response => {console.log(response.data)
        this.setState({ 
          activites: response.data,
        
        })

      })
      .catch((error) => {
        console.log("ma3rftch ccours ");
      })
  }
  download(fichier) {
    axios.get('http://localhost:5000/activite/download/'+fichier,{responseType:'arraybuffer'})
      .then(response => { 
        const url=window.URL.createObjectURL(new Blob([response.data]));
        const link =document.createElement('a');
        link.href=url;
        link.setAttribute('download','fichier');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });

  } 
  activiteList() {
    return this.state.activites.map(currentactivite => {
      return <Activite activite={currentactivite}  deleteActivite={this.deleteActivite} key={currentactivite._id}/>;
    })
  }
  render() {
    if(isLoginEtudiant()){
    return (
     
    <div>
       <HeaderEtudiant/>
      <MenuEtudiant/>
      <br></br>
      <br></br>
      <div style={{marginLeft:300}}>
      
      <div className="t1">
      <div className="titrecours" style={{marginLeft:-300}}> <b>les cours de cette matieres </b>    </div>
      <br></br>
    <table className=" table1">

      <thead className="head1">
        <tr>
          <th>Nom de cour</th>
          <th>type</th>
          <th>description</th>
          <th>fichier</th>
         
        </tr>
      </thead>
      <tbody className="body1">
      { this.activiteList() }
      </tbody>
    </table>
    <br></br>
    
</div>  

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