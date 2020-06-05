import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserEdit, FaCentercode } from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';
import { Button} from 'react-bootstrap';
import {BsPersonPlusFill ,BsTrashFill} from 'react-icons/bs';
import './list.css';
import { Header}  from './Header-admin';
import Erreur404 from '../erreurPage/erreur404'
import { isLoginAdmin } from './loginAdmin/loginAdmin'
    const Enseignant = props => (
      <tr>

        <td>{props.enseignant.code_ens}</td>
        <td>{props.enseignant.cin}</td>
        <td>{props.enseignant.nom}</td>
        <td>{props.enseignant.prenom}</td>
        <td>{props.enseignant.email}</td>
        <td>{props.enseignant.sexe}</td>
        <td>{props.enseignant.date_naissance}</td>
        <td>{props.enseignant.telephone}</td>
       <td>
      <FaUserEdit />&nbsp;<Link to={"/editenseignant/"+props.enseignant._id}>Edit</Link> &nbsp;|  <BsTrashFill />&nbsp;<a href="" onClick={() => { props.deleteEnseignant(props.enseignant._id) }}>Delete</a>
      </td>
      
       
      </tr>
    )
   class ListeEnseignant extends React.Component{ 
  
      constructor(props) {
        super(props);
        this.deleteEnseignant = this.deleteEnseignant.bind(this)

    
        this.state = {enseignants: [],
        recherche_type:'code_ens'  
        
        };
      }
    
      componentDidMount() {
        axios.get('http://localhost:5000/enseignant/')
          .then(response => {
            this.setState({ enseignants: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }
      deleteEnseignant(id) {
        axios.delete('http://localhost:5000/enseignant/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          enseignants: this.state.enseignants.filter(el => el._id !== id)
        })
      }
    
      enseignantList() {
        return this.state.enseignants.map(currentenseignant=> {
          return <Enseignant enseignant={currentenseignant} deleteEnseignant={this.deleteEnseignant} key={currentenseignant._id}/>;
        })
      }
      changer=(e)=>{

        var val=e.target.value;
        var type = this.state.recherche_type;
       
        
          
          if(val == ''){
            axios.get('http://localhost:5000/enseignant/')
          .then(response => {
            this.setState({ enseignants: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
          }else{
            console.log(type);
            if(type =="code_ens"){
              this.setState({
                enseignants :this.state.enseignants.filter(ens=>ens.code_ens.toLowerCase().startsWith(val.toLowerCase()))
              })
            }else{
              if(type =="cin"){
                this.setState({
                  enseignants :this.state.enseignants.filter(ens=>ens.cin.toLowerCase().startsWith(val.toLowerCase()))
                })
              } else {
                if(type =="prenom"){
                  this.setState({
                    enseignants :this.state.enseignants.filter(ens=>ens.prenom.toLowerCase().startsWith(val.toLowerCase()))
                  })
                }else{
                     this.setState({
                      enseignants :this.state.enseignants.filter(ens=>ens.nom.toLowerCase().startsWith(val.toLowerCase()))
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
            <h3>Liste des enseignants</h3>
            <div className="container" style={{marginLeft:-300}}>
	<div className="row">
		<div className="col-md-12">
            <div className="input-group" id="adv-search">
                <input type="text" class="form-control" placeholder="chercher ..." onChange={this.changer}/>
                        <select class="dropdownsearch" onChange={(e) => this.setState({recherche_type:e.target.value})} value={this.state.recherche_type}  style={{width:80}}  >
                        <option value="code_ens">  code d'enseignant</option>
                        <option value="cin">CIN</option>
                        <option value="prenom">Prenom</option>
                        <option value="nom">Nom</option>
                      
                     </select>
                    
      
            </div>
          </div>
        </div>
	</div>

          <div >
          <Button  className="buttonajout"variant="info" href="../addenseignant"> <BsPersonPlusFill/> Ajouter</Button>
          
          </div>
         
            <br/>
            <table className="tableau">
              <thead className="thead-light">
                <tr>
                  <th>CODE D'ENSEIGNANT</th>
                  <th>CIN</th>
                  <th>NOM</th>
                  <th>PRENOM</th>
                  <th>EMAIL</th>
                  <th>SEXE</th>
                  <th>DATE DE NAISSANCE </th>
                  <th>TELEPHONE</th>
                  <th>OPTION</th>
                </tr>
              </thead>
              <tbody>
                { this.enseignantList() }
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

export default ListeEnseignant;