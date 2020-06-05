import React from "react";
import {Table, Button} from 'react-bootstrap';
import './matiere_ens.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserEdit, FaFileDownload } from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';
import {BsPersonPlusFill ,BsTrashFill} from 'react-icons/bs';
import MenuEnseignant  from '../MenuEnseignant';
import HeaderEnseignant from "../HeaderEnseignant";
import Erreur404 from '../../../erreurPage/erreur404'
import { isLoginEnseignant ,getID} from '../LoginEnseignant/loginEnseignant'

const Activite= props => (
  <tr>
  <td>{props.activite.nom_activite}</td>
  <td>{props.activite.type_activite}</td>
  <td>{props.activite.description}</td>
 
  <td>
    <a href="" onClick={() => { props.download(props.activite.fichier) }}> <FaFileDownload /> </a>
  </td>
  <td>
      <FaUserEdit />&nbsp;<Link to={"/modifier/"+props.activite._id}>Edit</Link> &nbsp;|  <BsTrashFill />&nbsp;<a href="" onClick={() => { props.deleteActivite(props.activite._id) }}>Delete</a>
  </td>
 

</tr>
)
 export default class MatiereEnseignant extends React.Component {
  constructor(props) {
    super(props);
    this.deleteActivite = this.deleteActivite.bind(this);
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
  deleteActivite(id) {
    axios.delete('http://localhost:5000/activite/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      activites: this.state.activites.filter(el => el._id !== id)
    })
  } 
  download(fichier) {
    console.log(fichier)
    axios.get('http://localhost:5000/activite/download/'+fichier)
      .then(response => { 
        const url=window.URL.createObjectURL(new Blob([response.data]));
        const link =document.createElement('a');
        link.href=url;
        link.setAttribute('download','fichier');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error)=> {
      console.log("prblm dans axios  ")
      })

  } 
  activiteList() {
    return this.state.activites.map(currentactivite => {
      return <Activite activite={currentactivite}  deleteActivite={this.deleteActivite} key={currentactivite._id}/>;
    })
  }
  render() {
    if(isLoginEnseignant()){
    return (
     
    <div>
       <HeaderEnseignant/>
      <MenuEnseignant/>
      <br></br>
      <br></br>
      <a href="../ajout" class="buttonajout">Ajouter Activite</a>
      <div style={{marginLeft:300}}>
      
      <div className="t1">
      <div className="titrecours" style={{marginLeft:-300}}> <b>les cours de cette matieres </b>    </div>
      <br></br>
    <table className=" table1">

      <thead className="head1">
        <tr>
          <th>NOM</th>
          <th>TYPE</th>
          <th>DESCRIPTION</th>
          <th>FICHIER</th>
          <th>OPTION </th>
         
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