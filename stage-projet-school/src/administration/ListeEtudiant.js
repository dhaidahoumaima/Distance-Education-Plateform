import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button} from 'react-bootstrap';
import { FaUserEdit, FaCentercode } from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';
import {BsPersonPlusFill ,BsTrashFill} from 'react-icons/bs';
import './list.css';
import { Header}  from './Header-admin';
import Erreur404 from '../erreurPage/erreur404'
import { isLoginAdmin } from './loginAdmin/loginAdmin'

  const Etudiant = props => (
    <tr>

      <td>{props.etudiant.cne}</td>
      <td>{props.etudiant.cin}</td>
      <td>{props.etudiant.nom}</td>
      <td>{props.etudiant.prenom}</td>
      <td>{props.etudiant.email}</td>
      <td>{props.etudiant.sexe}</td>
      <td>{props.etudiant.date_naissance}</td>
      <td>{props.etudiant.telephone}</td>
      <td>{props.etudiant.nom_filiere.nom_filiere}</td>
      <td>
      <FaUserEdit />&nbsp;<Link to={"/editetudiant/"+props.etudiant._id}>Edit</Link> &nbsp;|  <BsTrashFill />&nbsp;<a href="" onClick={() => { props.deleteEtudiant(props.etudiant._id) }}>Delete</a>
      </td>
    </tr>
  )
  
  class ListeEtudiant extends React.Component{
    constructor(props) {
      super(props);
  
      this.deleteEtudiant = this.deleteEtudiant.bind(this)

      this.state = {etudiants: [],
        recherche_type:'cne' 
      
      };
    }
  
    componentDidMount() {
      axios.get('http://localhost:5000/etudiant/')
        .then(response => {console.log(response.data)
          this.setState({ etudiants: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    deleteEtudiant(id) {
      axios.delete('http://localhost:5000/etudiant/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        etudiants: this.state.etudiants.filter(el => el._id !== id)
      })
    }
    etudiantList() {
      return this.state.etudiants.map(currentetudiant => {
        return <Etudiant etudiant={currentetudiant}  deleteEtudiant={this.deleteEtudiant} key={currentetudiant._id}/>;
      })
    }
   
  
    changer=(e)=>{

      var val=e.target.value;
      var type = this.state.recherche_type;
     
      
        
        if(val == ''){
          axios.get('http://localhost:5000/etudiant/')
        .then(response => {
          this.setState({ etudiants: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
        }else{
          console.log(type);
          if(type =="cne"){
            this.setState({
              etudiants :this.state.etudiants.filter(etud=>etud.cne.toLowerCase().startsWith(val.toLowerCase()))
            })
          }else{
            if(type =="cin"){
              this.setState({
                etudiants :this.state.etudiants.filter(etud=>etud.cin.toLowerCase().startsWith(val.toLowerCase()))
              })
            } else {
              if(type =="prenom"){
                this.setState({
                  etudiants :this.state.etudiants.filter(etud=>etud.prenom.toLowerCase().startsWith(val.toLowerCase()))
                })
              }else{
                if(type=="nom"){
                   this.setState({
                  etudiants :this.state.etudiants.filter(etud=>etud.nom.toLowerCase().startsWith(val.toLowerCase()))
                })
                }else{
                  this.setState({
                    etudiants :this.state.etudiants.filter(etud=>etud.nom_filiere.nom_filiere.toLowerCase().startsWith(val.toLowerCase()))
                  })
                }
               
                console.log("je");
              }
            }
          }
          
        }
  
      
      }



    render() {
      if(isLoginAdmin()){  
      return (
        <div style={{overflowX:"auto"}}>
            <Header/>
           <br></br>  
          <h3>Liste Des Etudiants</h3>
          
<div className="container" style={{marginLeft:-300}}>
	<div className="row">
		<div className="col-md-12">
            <div className="input-group" id="adv-search">
              
                <input type="text" class="form-control" placeholder="chercher ..." onChange={this.changer}/>
                        <select class="dropdownsearch" onChange={(e) => this.setState({recherche_type:e.target.value})} value={this.state.recherche_type}  style={{width:80}}  >
                        <option value="cne">   CNE</option>
                        <option value="cin">CIN</option>
                        <option value="prenom">Prenom</option>
                        <option value="nom">Nom</option>
                        <option value="nom_filiere">FILIERE</option>
                     </select>
                    
      
            </div>
          </div>
        </div>
	</div>

          <div >
          <Button  className="buttonajout"variant="info" href="../addetudiant"> <BsPersonPlusFill/> Ajouter</Button>
          
          </div>
          <br/>
          <table className="tableau">
            <thead className="thead-light">
              <tr>
                <th>CNE</th>
                <th>CIN</th>
                <th>NOM</th>
                <th>PRENOM</th>
                <th>EMAIL</th>
                <th>SEXE</th>
                <th>DATE D'NAISSANCE</th>
                <th>TELEPHONE</th>
                <th>FILIERE</th>
                <th>OPTION</th>
              </tr>
            </thead>
            <tbody>
              { this.etudiantList() }
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
export default ListeEtudiant;