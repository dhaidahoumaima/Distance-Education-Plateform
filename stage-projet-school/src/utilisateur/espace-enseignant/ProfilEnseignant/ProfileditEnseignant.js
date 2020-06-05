
import React, { Component } from "react";
import './ProfilEnseignant.css';
import axios from 'axios';
import { getID } from '../LoginEnseignant/loginEnseignant';

class ProfilEditEnseignant extends Component {
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
    
    };
  }
  componentDidMount() {
    const ideens=getID();
    axios.get('http://localhost:5000/enseignant/'+ideens)
      .then(res => {console.log(res.data)
        this.setState({ 
          email:res.data.email,
          sexe:res.data.sexe,
          date_naissance:res.data.date_naissance,
          telephone:res.data.telephone,
           })
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
  const ideens=getID();
  const Enseignant = { 
      
      email:this.state.email,
      telephone:this.state.telephone,
  }
  console.log(Enseignant);

  axios.post('http://localhost:5000/enseignant/editenseignantbyenseignant/'+ ideens,Enseignant)
  .then(res=> console.log(res.data));
  
}
  render() {

    return (
      <div style={{marginLeft:260}} className="Profil1">
        <div>
          <div style={{fontSize:60},{fontFamily:"italy"}}> <b>EDIT PROFIL  </b></div>
          

                <div>
                    <form style={{width:700}}  onSubmit={this.onSubmit}>
                        <label for="email">Email address:</label>
                        <input type="email" class="form-control"  id="email" value={this.state.email}  onChange={this.onChangeEmail}/>
                        <label for="sexe">Sexe:</label>
                        <select name="sexe" class="form-control" id="sexe" value={this.state.sexe} disabled="disabled">
                           <option value="Homme">Homme</option>
                          <option value="Femme">Femme</option>
                        </select>
                       <label for="date">Date naissance:</label>
                        <input type="date"class="form-control" id="date_naissance" value={new Date(this.state.date_naissance).toLocaleDateString()} disabled="disabled"/>
                        <label for="telephone">Telephone:</label>
                        <input type="text" class="form-control" id="telephone" value={this.state.telephone}  onChange={this.onChangeTelephone}/>
                        <button type="submit" class="buttonedit">editer</button>
                    </form>

                </div>
        </div>
</div>
    )
    
  }
}


export default ProfilEditEnseignant;
