import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './edit.css';
import Erreur404 from '../../erreurPage/erreur404'
import { isLoginAdmin } from '../loginAdmin/loginAdmin'


class EditEtudiant extends React.Component{
 
constructor(props) {

    super(props);
   
    this.onChangeCne=this.onChangeCne.bind(this);
    this.onChangeCin=this.onChangeCin.bind(this);
    this.onChangeNom=this.onChangeNom.bind(this);
    this.onChangePrenom=this.onChangePrenom.bind(this);
    this.onChangeEmail=this.onChangeEmail.bind(this);
    this.onChangeSexe=this.onChangeSexe.bind(this);
    this.onChangeDate_naissance=this.onChangeDate_naissance.bind(this);
    this.onChangeTelephone=this.onChangeTelephone.bind(this);
    this.onChangeNomFiliere=this.onChangeNomFiliere.bind(this);
    this.onSubmit=this.onSubmit.bind(this);

    this.state={
      cne:'',
        cin:'',
        nom:'',
        prenom:'',
        email:'',
        sexe:'',
        date_naissance:'',
        telephone:'',
        nom_filiere:'',
        filieres:[]
        
    }
    
    
}

componentDidMount() {
    axios.get('http://localhost:5000/etudiant/'+ this.props.match.params.id)  
      .then(response => {
        this.setState({
          cne:response.data.cne, 
          cin:response.data.cin,
          nom:response.data.nom,
          prenom:response.data.prenom,
          email:response.data.email,
          sexe:response.data.sexe,
          date_naissance:response.data.date_naissance,
          telephone:response.data.telephone,
          nom_filiere:response.data.nom_filiere
        })   
      })
      .catch(function (error) {
        console.log("probleeemeeeeee ");
      })

      axios.get('http://localhost:5000/filiere')  
      .then(response => {
          this.setState({
          filieres:response.data, 
          nom_filiere:response.data[0]._id,
          })   
      })
      .catch(function (error) {
          console.log("probleeemeeeeee ");
      })

      
  }


  onChangeCne(e){
      this.setState({
        cne: e.target.value });
  }
  
  onChangeCin(e){
      this.setState({
         cin: e.target.value });
  }
onChangeNom(e){
    this.setState({
       nom: e.target.value });
}

onChangePrenom(e){
    this.setState({
       prenom: e.target.value });
}

onChangeEmail(e){
    this.setState({
       email: e.target.value });
}

onChangeSexe(e){
    this.setState({
       sexe: e.target.value });
}
onChangeDate_naissance(e){
  this.setState({
     date_naissance: e.target.value });
}



onChangeTelephone(e){
    this.setState({
       telephone: e.target.value });
}
onChangeNomFiliere(e){
  this.setState({
     nom_filiere: e.target.value });
}



onSubmit(e){
    e.preventDefault();
    const Etudiant = { 
        cne:this.state.cne, 
        cin:this.state.cin,
        nom:this.state.nom,
        prenom:this.state.prenom,
        email:this.state.email,
        sexe:this.state.sexe,
        date_naissance:this.state.date_naissance,
        telephone:this.state.telephone,
        nom_filiere:this.state.nom_filiere
    }
    console.log(Etudiant);

    axios.post('http://localhost:5000/etudiant/editetudiant/'+ this.props.match.params.id,Etudiant)
    .then(res=> console.log(res.data));
    window.location = '/listetudiant';
}
  render(){
    if(isLoginAdmin()){  
  return (
  
          <div className="editbody">
                <div className="container table-wrapper1">
                   
                    <h1> <b>Modifier Etudiant </b></h1>
                </div>
                   
                <form noValidate onSubmit={this.onSubmit} className="myformmodif">
                    
                    <div className="form-group">
                        <label htmlFor ="cne" className="col-25"> CNE  </label>
                        <input type="text" className="form-control"  value={this.state.cne} onChange={this.onChangeCne}/>
                    </div>
        
                    <div className="form-group">
                       <label htmlFor ="cin" className="col-25">CIN</label>
                      <input type="text" className="form-inline " value={this.state.cin} onChange={this.onChangeCin}/>
                     </div>
                    <div className="form-group ">
                        <label htmlFor ="nom" className="col-25">Le nom</label>
                        <input type="text" className="form-control "  value={this.state.nom} onChange={this.onChangeNom}/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor ="prenom" className="col-25">Le prenom</label>
                        <input type="text"  className="form-control"  value={this.state.prenom}  onChange={this.onChangePrenom}/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor ="email" className="col-25">L'addresse email</label>
                        <input type="text" className="form-control " value={this.state.email}  onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group ">
                    <label htmlFor ="sexe" className="col-25">Le sexe </label>
                  <select  className="form-control " name="sexe"  value={this.state.sexe} onChange={this.onChangeSexe}>
                        <option value="Femme">Femme</option>
                        <option value="Homme">Homme</option>
                    </select>
               
                   </div>
                  
                   <div className="form-group">
                         <label htmlFor ="date" className="col-25">La date de naissance</label>
                         <input type="date" className="form-control"    value={this.state.date_naissance}  onChange={this.onChangeDate_naissance}/>
                   </div>
                   <div className="form-group ">
                         <label htmlFor ="telephone" className="col-25">Le numéro de téléphone</label>
                         <input type="text" className="form-control "   value={this.state.telephone} onChange={this.onChangeTelephone}/>
                   </div>
                   <div className="form-group ">
                   <label htmlFor ="nom_filiere" className="col-25">Filiere</label>
                        <select  className="form-control " name="nom_filiere" onChange={this.onChangeNomFiliere}>
                        {this.state.filieres.map(filieres=>(
                        <option key={filieres._id} value={filieres._id}>{filieres.nom_filiere}</option>

                        ))}
                        </select> 
                    </div> 
                                       
                   <div className="notification">
            
                        <button type="submit"  className="myButtonedit" >Modifier</button>
        
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
}


export default EditEtudiant;