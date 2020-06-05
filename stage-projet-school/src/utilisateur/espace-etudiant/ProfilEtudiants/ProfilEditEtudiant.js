
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import './ProfilEtudiant.css';
import axios from 'axios';
import { getID } from '../loginEtudiant/loginEtudiant';

class ProfilEditEtudiant extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail=this.onChangeEmail.bind(this);
    this.onChangeTelephone=this.onChangeTelephone.bind(this);
    this.onSubmit=this.onSubmit.bind(this);


    this.state = {
      email:'',
      sexe:'',
      date_naissance:'',
      telephone:'',
      nom_filiere:'',
    
    };
  }

  componentDidMount() {
    const idetud=getID();
    axios.get('http://localhost:5000/etudiant/'+idetud)
      .then(res => {console.log(res.data)
        this.setState({ 
          email:res.data.email,
          sexe:res.data.sexe,
          date_naissance:res.data.date_naissance,
          telephone:res.data.telephone,
          nom_filiere:res.data.nom_filiere.nom_filiere, })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  onChangeEmail(e){
    this.setState({
       email: e.target.value });
}
  onChangeTelephone(e){
    this.setState({
       telephone: e.target.value });
}
  onSubmit(e){
    e.preventDefault();
    const idetud=getID();
    const Etudiant = { 
        
        email:this.state.email,
        telephone:this.state.telephone,
    }
    console.log(Etudiant);

    axios.post('http://localhost:5000/etudiant/editetudiantbyetudiant/'+ idetud,Etudiant)
    .then(res=> console.log(res.data));
    
}
  render() {

    return (
      <div style={{marginLeft:260}} className="Profil1">
        <div>
          <div style={{fontSize:60},{fontFamily:"italy"}}> <b>EDIT PROFIL  </b></div>
          
                <div>
                    <form style={{width:700}} onSubmit={this.onSubmit}>
                        <label for="email">Email address:</label>
                        <input type="text" class="form-control"  id="email" value={this.state.email}  onChange={this.onChangeEmail} />
                        <label for="sexe">Sexe:</label>
                        <select name="sexe" class="form-control" id="sexe" value={this.state.sexe} disabled="disabled">
                           <option value="Homme">Homme</option>
                          <option value="Femme">Femme</option>
                        </select>
                        <label for="date">Date naissance:</label>
                        <input type="text"class="form-control"  id="date" value={new Date(this.state.date_naissance).toLocaleDateString()} disabled="disabled" />
                        <label for="telephone">Telephone:</label>
                        <input type="text" class="form-control"  id="email"value={this.state.telephone}  onChange={this.onChangeTelephone}/>
           
                        Filiere:<input type="text" class="form-control" value={this.state.nom_filiere} disabled="disabled" id="pwd"/>
                        <button type="submit" class="buttonedit">editer</button>
                    </form>

                </div>
        </div>
</div>
    )
    
  }
}


export default ProfilEditEtudiant;
