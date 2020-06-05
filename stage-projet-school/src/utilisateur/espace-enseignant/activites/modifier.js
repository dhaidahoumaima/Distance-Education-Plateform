import React from 'react';
import './ajout.css';
import axios from 'axios';
import Erreur404 from '../../../erreurPage/erreur404'
import { isLoginEnseignant } from '../LoginEnseignant/loginEnseignant'
export default class editActivite extends React.Component{
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
             type:'',
             nom_matiere:'',
            nom_filiere:'',
            nom_ens:'',
            description:'',
            filieres:[],
            enseignants:[],
            matieres:[]
            
         
        }
 
    }
    componentDidMount() {
        axios.get('http://localhost:5000/activite/'+ this.props.match.params.id)  
        .then(response => {
          this.setState({
            nom_activite:response.data.nom_activite,
            fichier:response.data.fichier,
            type:response.data.type,
            nom_matiere:response.data.nom_matiere,
            nom_filiere:response.data.nom_filiere,
            nom_ens:response.data.nom_ens,
            description:response.data.description,
          })   
        })
        .catch(function (error) {
          console.log("probleeemeeeeee dans matiere ");
        })
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
          fichier: e.target.value });
    }
    onChangeType(e){
      this.setState({
         type: e.target.value });
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

  onSubmit(e){
    e.preventDefault();

    const Activite = { 
        nom_activite:this.state.nom_activite, 
        fichier:this.state.fichier,
        type:this.state.type,
        nom_matiere:this.state.nom_matiere, 
        nom_filiere:this.state.nom_filiere, 
        nom_ens:this.state.nom_ens, 
        description:this.state.description 
    }



    axios.post('http://localhost:5000/activite/Editactivite/'+ this.props.match.params.id,Activite)
    .then(res=> console.log(res.data));
    window.location = '/activites/'+Activite.nom_matiere;
 
}
    render(){
        if(isLoginEnseignant()){

        return(
<div className=" ajout">
<form class="form-style-9" noValidate onSubmit={this.onSubmit} >
<ul>
<li>
    <input type="text" name="nom_activite" class="field-style field-full align-none" placeholder="Nom d'activite "  value={this.state.nom_activite} onChange={this.onChangeNom_Activite}/>
</li>  
<li>
    <input type="text" name="fichier" class="field-style field-full align-none" value={this.state.fichier} onChange={this.onChangeFichier}/>
</li> 

<li>
    <select name="Type" class="field-style field-full align-none" placeholder="Type" value={this.state.type} onChange={this.onChangeType} >
            <option value="cours">Cours</option>
            <option value="exercices">Exercices</option>
          </select>
</li>
 <li>
    <select name="Matiere" class="field-style field-full align-none"  onChange={this.onChangeNom_Matiere}>
    {this.state.matieres.map(matieres=>(
                        <option key={matieres._id} value={matieres._id}>{matieres.nom_matiere}</option>

                        ))}
          </select>
</li>
<li>
<select name="Filiere" class="field-style field-full align-none" placeholder="Filiere"  onChange={this.onChangeNom_Filiere}>
{this.state.filieres.map(filieres=>(
                        <option key={filieres._id} value={filieres._id}>{filieres.nom_filiere}</option>

                        ))}
          </select>
</li>
<li>
<select name="Enseignant" class="field-style field-full align-none" placeholder="Enseignant" onChange={this.onChangeEnseignant}>
{this.state.enseignants.map(enseignants=>(
                        <option key={enseignants._id} value={enseignants._id}>{enseignants.nom} {enseignants.prenom}</option>

                        ))}
          </select>
</li>
<li>
<textarea name="description" class="field-style" placeholder="Description" value={this.state.description} onChange={this.onChangeDescription}></textarea>
</li>
<li>
<input type="submit" value="modifier " />
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

