import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserEdit, FaCentercode } from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';
import { Button} from 'react-bootstrap';
import {BsPersonPlusFill ,BsTrashFill} from 'react-icons/bs';
import Erreur404 from '../erreurPage/erreur404'
import { isLoginAdmin } from './loginAdmin/loginAdmin'
import './list.css';
import { Header}  from './Header-admin';
const Matiere = props => (
  <tr>
   
    <td>{props.matiere.nom_matiere}</td>
    <td>{props.matiere.ens_matiere.nom} {props.matiere.ens_matiere.prenom}</td>
    <td>{props.matiere.heure_matiere}</td>
    <td>{props.matiere.nom_filiere.nom_filiere}</td>
    <td>
      <FaUserEdit />&nbsp;<Link to={"/editmatiere/"+props.matiere._id}>Edit</Link> &nbsp;|  <FaUserTimes />&nbsp;<a href="" onClick={() => { props.deleteMatiere(props.matiere._id) }}>Delete</a>
      </td>
  </tr>
)

class ListeMatiere extends React.Component{
  constructor(props) {
    super(props);
    this.deleteMatiere = this.deleteMatiere.bind(this)

    this.state = {matieres: [],
      recherche_type:'nom_matiere' 

      
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/matiere/')
      .then(response => {
        this.setState({ matieres: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  deleteMatiere(id) {
    axios.delete('http://localhost:5000/matiere/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      matieres: this.state.matieres.filter(el => el._id !== id)
    })
  }

  matiereList() {
    return this.state.matieres.map(currentmatiere => {
      return <Matiere matiere={currentmatiere}  deleteMatiere={this.deleteMatiere} key={currentmatiere._id}/>;
    })
  }
 

  changer=(e)=>{

    var val=e.target.value;
    var type = this.state.recherche_type;
   
    
      
      if(val == ''){
        axios.get('http://localhost:5000/matiere/')
      .then(response => {
        this.setState({ matieres: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
      }else{
        console.log(type);
        if(type =="nom_matiere"){
          this.setState({
            matieres :this.state.matieres.filter(matiere=>matiere.nom_matiere.toLowerCase().startsWith(val.toLowerCase()))
          })
        }else{
          if(type =="ens_matiere"){
            this.setState({
              matieres :this.state.matieres.filter(matiere=>matiere.ens_matiere.nom.toLowerCase().startsWith(val.toLowerCase()))
            })
          } else {
            if(type =="heure_matiere"){
              this.setState({
                matieres :this.state.matieres.filter(matiere=>matiere.heure_matiere.toLowerCase().startsWith(val.toLowerCase()))
              })
            }else{
              
                this.setState({
                  matieres :this.state.matieres.filter(matiere=>matiere.nom_filiere.nom_filiere.toLowerCase().startsWith(val.toLowerCase()))
                })
              }
             
              console.log("je");
            }
          }
        
        
      }

    
    }

  render() {
    if(isLoginAdmin()){  
    return (
      <div style={{overflowX:"auto"}}>
           <Header/>  
        <h3>Liste des matieres</h3>
       
        <div className="container" style={{marginLeft:-300}}>
	<div className="row">
		<div className="col-md-12">
            <div className="input-group" id="adv-search">
                <input type="text" class="form-control" placeholder="chercher ..." onChange={this.changer}/>
                        <select class="dropdownsearch" onChange={(e) => this.setState({recherche_type:e.target.value})} value={this.state.recherche_type}  style={{width:80}}  >
                        <option value="nom_matiere">  Matiere</option>
                        <option value="ens_matiere"> NOM D'ENSEIGNANT</option>
                        <option value="heure_matiere">Heure</option>
                        
                        <option value="nom_filiere">FILIERE</option>
                     </select>
                    
      
            </div>
          </div>
        </div>
	</div>

          <div >
          <Button  className="buttonajout"variant="info" href="../addmatiere"> <BsPersonPlusFill/> Ajouter</Button>
          
          </div>


        <br/>
        <table className="tableau">
          <thead className="thead-light">
            <tr>
              <th>MATIERE</th>
             <th>ENSEIGNANT DE LA MATIERE</th>
              <th> NOMBRES DES HEURES</th>
              <th>FILIERE</th>
              <th>OPTION</th>
         
   
          
            </tr>
          </thead>
          <tbody>
            { this.matiereList() }
          </tbody>
        </table>
      </div>
    );
  }else{
    return(
      <Erreur404/>
    );
  }
  }
}

export default ListeMatiere;