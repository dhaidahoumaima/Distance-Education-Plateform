import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './edit.css';
import Erreur404 from '../../erreurPage/erreur404'
import { isLoginAdmin } from '../loginAdmin/loginAdmin'

class EditMatiere extends React.Component{

  constructor(props) {

    super(props)
   
    this.onChangeNom_Matiere=this.onChangeNom_Matiere.bind(this);
    this.onChangeEns_Matiere=this.onChangeEns_Matiere.bind(this);
    this.onChangeHeure_Matiere=this.onChangeHeure_Matiere.bind(this);
    this.onChangeNom_filiere=this.onChangeNom_filiere.bind(this);
    this.onSubmit=this.onSubmit.bind(this);

    this.state={
      nom_matiere:'',
        ens_matiere:'',
        heure_matiere:'',
        nom_filiere:'',
        filieres:[],
        enseignants:[] 
    }
    

}
componentDidMount() {
  axios.get('http://localhost:5000/matiere/'+ this.props.match.params.id)  
    .then(response => {
      this.setState({
        nom_matiere:response.data.nom_matiere,
        ens_matiere:response.data.ens_matiere,
        heure_matiere:response.data.heure_matiere,
        nom_filiere:response.data.nom_filiere
      })   
    })
    .catch(function (error) {
      console.log("probleeemeeeeee dans matiere ");
    })

    axios.get('http://localhost:5000/filiere')  
    .then(response => {
        this.setState({
        filieres:response.data, 
        nom_filiere:response.data[0]._id,
        })   
    })
    .catch(function (error) {
        console.log("probleeemeeeeee filiere ");
    })

    axios.get('http://localhost:5000/enseignant')  
    .then(response => {
        this.setState({
        enseignants:response.data, 
        ens_matiere:response.data[0]._id,
        })   
    })
    .catch(function (error) {
        console.log("probleeemeeeeee enseignant");
    })
}

  onChangeNom_Matiere(e){
      this.setState({
        nom_matiere: e.target.value });
  }
  
  onChangeEns_Matiere(e){
      this.setState({
         ens_matiere: e.target.value });
  }


  onChangeHeure_Matiere(e){
    this.setState({
       heure_matiere: e.target.value });
}

  onChangeNom_filiere(e){
    this.setState({
       nom_filiere: e.target.value });
}  

  onSubmit(e){
    e.preventDefault();

    const Matiere = { 
      nom_matiere:this.state.nom_matiere, 
      ens_matiere:this.state.ens_matiere,
      heure_matiere:this.state.heure_matiere,
      nom_filiere:this.state.nom_filiere
      
    }


    axios.post('http://localhost:5000/matiere/EditMatiere/'+ this.props.match.params.id,Matiere)
    .then(res=> console.log(res.data));
    window.location = '/listmatiere';
 
}
    render(){
      if(isLoginAdmin()){  
  return (
    <div className="editbody">
                <div className="container table-wrapper1">
                   
                    <h1> <b>modifier Matiere </b></h1>
                </div>
                   
                <form noValidate onSubmit={this.onSubmit} className="myformmodif">
                    <div className="form-group">
                        <label htmlFor ="nom_matiere" className="col-25"> nom du matiere  </label>
                        <input type="text" className="form-control"  name="nom_matiere"  placeholder="entrer le nom du matiere "  value={this.state.nom_matiere} onChange={this.onChangeNom_Matiere}/>
                    </div>
        
                     <div className="form-group">
                           <label htmlFor ="ens_matiere" className="col-25">Enseignant</label>
                        <select  className="form-control " name="ens_matiere"  value={this.state.ens_matiere} onChange={this.onChangeEns_Matiere}>
                        {this.state.enseignants.map(enseignants=>(
                        <option key={enseignants._id} value={enseignants._id}>{enseignants.nom} {enseignants.prenom}</option>

                        ))}
                        </select>
                    
                   </div>   
                    <div className="form-group ">
                        <label htmlFor ="heure_matiere" className="col-25">nombre des heures du matiere </label>
                        <input type="text"  className="form-control col-75"  name=" heure_matiere"  placeholder="entrer l' heure du matiere"  value={this.state.heure_matiere}  onChange={this.onChangeHeure_Matiere}/>
                    </div>
    
                    <div className="form-group ">
                         <label htmlFor ="nom_filiere" className="col-25">Filiere</label>
                        <select  className="form-control " name="nom_filiere" value={this.state.nom_filiere}  onChange={this.onChangeNom_filiere}>
                        {this.state.filieres.map(filieres=>(
                        <option key={filieres._id} value={filieres._id}>{filieres.nom_filiere}</option>

                        ))}
                        </select>
                    
                   </div>  
                             
                   <div className="notification">
            
                        <button type="submit"  class="myButtonedit" >Modifier</button>
        
                  </div>
                 </form>
             </div>    
        
);
}else{
  return(
    <Erreur404/>
  );
}
}
} export default EditMatiere;