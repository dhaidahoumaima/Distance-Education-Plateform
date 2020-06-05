import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './add.css';
import Erreur404 from '../../erreurPage/erreur404'
import { isLoginAdmin } from '../loginAdmin/loginAdmin'
class AddEnseignant extends React.Component{

constructor(props) {

    super(props)
   
    this.onChangeCode_ens=this.onChangeCode_ens.bind(this);
    this.onChangeCin=this.onChangeCin.bind(this);
    this.onChangeNom=this.onChangeNom.bind(this);
    this.onChangePrenom=this.onChangePrenom.bind(this);
    this.onChangeEmail=this.onChangeEmail.bind(this);
    this.onChangeSexe=this.onChangeSexe.bind(this);
    this.onChangeDate_naissance=this.onChangeDate_naissance.bind(this);
    this.onChangeTelephone=this.onChangeTelephone.bind(this);
    this.onSubmit=this.onSubmit.bind(this);

    this.state={
      code_ens:'',
        cin:'',
        nom:'',
        prenom:'',
        email:'',
        sexe:'',
        date_naissance:'',
        telephone:'',
        
    }
  

}
  onChangeCode_ens(e){
      this.setState({
        code_ens: e.target.value });
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

onSubmit(e){
    e.preventDefault();

    const Enseignant = { 
        code_ens:this.state.code_ens, 
        cin:this.state.cin,
        nom:this.state.nom,
        prenom:this.state.prenom,
        email:this.state.email,
        sexe:this.state.sexe,
        date_naissance:this.state.date_naissance,
        telephone:this.state.telephone,
    }


    axios.post('http://localhost:5000/enseignant/addEnseignant',Enseignant)
    .then(res=> console.log(res.data));

    this.setState({
      code_ens:'',
      cin:'',
      nom:'',
      prenom:'',
      email:'',
      sexe:'',
      date_naissance:'',
      telephone:'',
    })
    window.location = '/listenseignant';

}


    render(){
        if(isLoginAdmin()){  
  return (
      <div className="addbody  addfiliere">
            <div >
               
                <h1><b>Nouveau  Enseignant </b></h1>
            </div>
               
            <form noValidate onSubmit={this.onSubmit} className="myformajout">
                <div className="container">
               
                </div>
                <div className="form-group ">
                    <label htmlFor ="code_ens" className="col-25">Le code Enseignant</label>
                    <input type="text" className=" form-control "  name="code_ens"  placeholder="entrer le code "  value={this.state.code_ens} onChange={this.onChangeCode_ens}/>
                </div>
    
                <div className="form-group ">
                   <label htmlFor ="cin" className="col-25">Le code du cin</label>
                  <input type="text" className=" form-control " name="cin" placeholder="entrer le cin" value={this.state.cin} onChange={this.onChangeCin}/>
                 </div>
                <div className="form-group">
                    <label htmlFor ="nom" className="col-25">Le nom</label>
                    <input type="text" className="form-control "  name="nom"  placeholder="entrer le nom" value={this.state.nom} onChange={this.onChangeNom}/>
                </div>
                <div className="form-group">
                    <label htmlFor ="prenom" className="col-25">Le prenom</label>
                    <input type="text"  className="form-control "  name="prenom"  placeholder="entrer le prenom"  value={this.state.prenom}  onChange={this.onChangePrenom}/>
                </div>
                <div className="form-group ">
                    <label htmlFor ="email" className="col-25">L'addresse email</label>
                    <input type="email" className="form-control " name="email"  placeholder="entrer l' email"  value={this.state.email}  onChange={this.onChangeEmail}/>
                </div>
                <div className="form-group ">
                    <label htmlFor ="sexe" className="col-25">Le sexe </label>
               <select  className="form-control " name="sexe"  value={this.state.sexe} onChange={this.onChangeSexe}>
                    <option value="Femme">Femme</option>
                    <option value="Homme">Homme</option>
                </select>
                </div>
               <div className="form-group ">
                     <label htmlFor ="date" className="col-25">La date de naissance</label>
                     <input type="date" className="form-control "  name="date_naissance" placeholder="entrer la date_naissance"  value={this.state.date_naissance}  onChange={this.onChangeDate_naissance}/>
               </div>
    
               <div className="form-group ">
                     <label htmlFor ="telephone" className="col-25">Le numéro de téléphone</label>
                     <input type="text" className="form-control " name="telephone" placeholder="entrer le numéro de telephone" value={this.state.telephone} onChange={this.onChangeTelephone}/>
               </div>
                                   
               <div className="notification">
        
                    <button type="submit"  className="myButton" >Ajouter</button>
    
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
export default AddEnseignant;