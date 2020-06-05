import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import '../Add/add.css';
import Erreur404 from '../../erreurPage/erreur404'
import { isLoginAdmin } from '../loginAdmin/loginAdmin'

class EditEnseignant extends React.Component{
   
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
          telephone:''
          
      }
     
  }
  componentDidMount() {
    axios.get('http://localhost:5000/enseignant/'+ this.props.match.params.id)  
      .then(response => {
        this.setState({
          code_ens:response.data.code_ens, 
          cin:response.data.cin,
          nom:response.data.nom,
          prenom:response.data.prenom,
          email:response.data.email,
          sexe:response.data.sexe,
          date_naissance:response.data.date_naissance,
          telephone:response.data.telephone
         
        })   
      })
      .catch(function (error) {
        console.log("probleeemeeeeee ");
      })
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
          telephone:this.state.telephone
      }
  
  
      axios.post('http://localhost:5000/enseignant/editEnseignant/'+ this.props.match.params.id,Enseignant)
      .then(res=> console.log(res.data));
      window.location = '/listenseignant';
   
  }
  
  
      render(){
        if(isLoginAdmin()){  
    return (
        <div className="editbody">
              <div >
                 
                  <h1><b>Modifier  Enseignant </b></h1>
              </div>
                 
              <form noValidate onSubmit={this.onSubmit} className="myformmodif">
                  <div className="container">
                 
                  </div>
                  <div className="form-group ">
                      <label htmlFor ="code_ens" className="col-25">Le code Enseignant</label>
                      <input type="text" className=" form-control "  name="code_ens"  value={this.state.code_ens} onChange={this.onChangeCode_ens}/>
                  </div>
      
                  <div className="form-group ">
                     <label htmlFor ="cin" className="col-25">Le code du cin</label>
                    <input type="text" className=" form-control " name="cin"  value={this.state.cin} onChange={this.onChangeCin}/>
                   </div>
                  <div className="form-group">
                      <label htmlFor ="nom" className="col-25">Le nom</label>
                      <input type="text" className="form-control "  name="nom"  value={this.state.nom} onChange={this.onChangeNom}/>
                  </div>
                  <div className="form-group">
                      <label htmlFor ="prenom" className="col-25">Le prenom</label>
                      <input type="text"  className="form-control "  name="prenom"   value={this.state.prenom}  onChange={this.onChangePrenom}/>
                  </div>
                  <div className="form-group ">
                      <label htmlFor ="email" className="col-25">L'addresse email</label>
                      <input type="email" className="form-control " name="email"  value={this.state.email}  onChange={this.onChangeEmail}/>
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
                       <input type="date" className="form-control "  name="date_naissance"  value={this.state.date_naissance}  onChange={this.onChangeDate_naissance}/>
                 </div>
      
                 <div className="form-group ">
                       <label htmlFor ="telephone" className="col-25">Le numéro de téléphone</label>
                       <input type="text" className="form-control " name="telephone" value={this.state.telephone} onChange={this.onChangeTelephone}/>
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

export default EditEnseignant;