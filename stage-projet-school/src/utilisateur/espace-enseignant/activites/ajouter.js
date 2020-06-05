import React from 'react';
import './ajout.css';
import axios from 'axios';
import Erreur404 from '../../../erreurPage/erreur404'
import { isLoginEnseignant } from '../LoginEnseignant/loginEnseignant'

export default class AddActivite extends React.Component{
    constructor(props) {
    
        super(props)
       

        this.onChangeNom_Activite=this.onChangeNom_Activite.bind(this);
        this.onChangeFichier=this.onChangeFichier.bind(this);
        this.onChangeType=this.onChangeType.bind(this);
        this.onChangeNom_Matiere=this.onChangeNom_Matiere.bind(this);
        this.onChangeNom_Filiere=this.onChangeNom_Filiere.bind(this);
        this.onChangeEnseignant=this.onChangeEnseignant.bind(this);
        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

         
        this.state={
          nom_activite:'',
            fichier:'',
            type_activite:'',
            nom_matiere:'',
            nom_filiere:'',
            nom_ens:'',
            description:'',
            filieres:[],
            enseignants:[],
            matieres:[],
           
            
         
        }
 
    }
    componentDidMount() {
        axios.get('http://localhost:5000/filiere/')  
                .then(response => {
                    this.setState({
                    filieres:response.data, 
                    nom_filiere:response.data[0]._id,
                    })   
                })
                .catch(function (error) {
                    console.log("probleeemeeeeee ");
                })

                axios.get('http://localhost:5000/enseignant/')  
                .then(response => {
                    this.setState({
                    enseignants:response.data, 
                    nom_ens:response.data[0]._id,
                    })   
                })
                .catch(function (error) {
                    console.log("probleeemeeeeee ");
                })
                axios.get('http://localhost:5000/matiere/')  
                .then(response => {
                    this.setState({
                    matieres:response.data, 
                    nom_matiere:response.data[0]._id,
                    })   
                })
                .catch(function (error) {
                    console.log("probleeemeeeeee ");
                })

    }
 
      onChangeNom_Activite(e){
          this.setState({
            nom_activite: e.target.value });
      }
     
      onChangeFichier(e){
          this.setState({
            fichier: e.target.files[0] });
      }
      onChangeType(e){
        this.setState({
            type_activite: e.target.value });
    }
    onChangeNom_Matiere(e){
        this.setState({
           nom_matiere: e.target.value });
    }
    onChangeNom_Filiere(e){
        this.setState({
           nom_filiere: e.target.value });
    }
    onChangeEnseignant(e){
        this.setState({
           nom_ens: e.target.value });
    }
    onChangeDescription(e){
        this.setState({
           description: e.target.value });
    }
    onSubmit=async(e)=>{
        e.preventDefault();
    var formData=await new FormData();

        await formData.append('nom_activite', this.state.nom_activite)
        formData.append('fichier', this.state.fichier)
        formData.append('type_activite', this.state.type_activite)
        formData.append('nom_matiere', this.state.nom_matiere)
        formData.append('nom_filiere', this.state.nom_filiere)
        formData.append('nom_ens', this.state.nom_ens)
        formData.append('description', this.state.description)
       
        console.log(this.state.type_activite)
        axios.post('http://localhost:5000/activite/addactivite',formData)
        .then(res=> console.log(res.data));
    
     
        window.location = '/activites/'+this.state.nom_matiere;
 
    }
    render(){
        if(isLoginEnseignant()){
        return(
<div className=" ajout">
<form class="form-style-9" noValidate onSubmit={this.onSubmit} enctype="multipart/form-data">
<ul>
<li>
    <input type="text" name="nom_activite" class="field-style field-full align-none" placeholder="Nom d'activite "  value={this.state.nom_activite} onChange={this.onChangeNom_Activite}/>
</li>  
<li>
    <input type="file" name="fichier" class="field-style field-full align-none"  onChange={this.onChangeFichier}/>
</li> 

<li>
    <select name="type_activite" class="field-style field-full align-none" placeholder="Type" value={this.state.type_activite} onChange={this.onChangeType}  >
            <option defaultValue=""></option>
            <option value="cours">Cours</option>
            <option value="exercices">Exercices</option>
          </select>
</li>
 <li>
    <select name="nom_matiere" class="field-style field-full align-none" placeholder="Matiere" onChange={this.onChangeNom_Matiere}>
    {this.state.matieres.map(matieres=>(
                        <option key={matieres._id} value={matieres._id}>{matieres.nom_matiere}</option>

                        ))}
          </select>
</li>
<li>
<select name="nom_filiere" class="field-style field-full align-none" placeholder="Filiere" onChange={this.onChangeNom_Filiere}>
{this.state.filieres.map(filieres=>(
                        <option key={filieres._id} value={filieres._id}>{filieres.nom_filiere}</option>

                        ))}
          </select>
</li>
<li>
<select name="nom_ens" class="field-style field-full align-none" placeholder="Enseignant" onChange={this.onChangeEnseignant}>
{this.state.enseignants.map(enseignants=>(
                        <option key={enseignants._id} value={enseignants._id}>{enseignants.nom} {enseignants.prenom}</option>

                        ))}
          </select>
</li>
<li>
<textarea name="description" class="field-style" placeholder="Description" value={this.state.description} onChange={this.onChangeDescription}></textarea>
</li>
<li>
<input type="submit" value="ajouter " />
</li>
</ul>
</form>
</div>
        );
    }else{
        return(
          <Erreur404/>
        );
      }

    }
}

