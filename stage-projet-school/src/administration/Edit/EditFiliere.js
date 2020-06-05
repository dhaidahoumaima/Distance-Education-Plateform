import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './edit.css'
import Erreur404 from '../../erreurPage/erreur404'
import { isLoginAdmin } from '../loginAdmin/loginAdmin'

class EditFiliere extends React.Component{

            constructor(props) {
            
                super(props)
                     
                this.onChangeNom_filiere=this.onChangeNom_filiere.bind(this);
                this.onChangeDescription=this.onChangeDescription.bind(this);
                this.onSubmit=this.onSubmit.bind(this);
                this.state={
                    nom_filiere:'',
                    description:'', 
                }
            
            }
            componentDidMount() {
                axios.get('http://localhost:5000/filiere/'+ this.props.match.params.id)  
                  .then(response => {
                    this.setState({
                        nom_filiere:response.data.nom_filiere,
                        description:response.data.description,
                     
                    })   
                  })
                  .catch(function (error) {
                    console.log("probleeemeeeeee ");
                  })
              }
            onChangeNom_filiere(e){
                  this.setState({
                     nom_filiere: e.target.value });
              }  
            onChangeDescription(e){
                this.setState({
                   description: e.target.value });
            }
           
            onSubmit(e){
                e.preventDefault();
            
                const Filiere = { 
                  nom_filiere:this.state.nom_filiere,
                  description:this.state.description,
                }
            
            
                axios.post('http://localhost:5000/filiere/editfiliere/'+ this.props.match.params.id,Filiere)
                .then(res=> console.log(res.data));
                window.location = '/listfiliere';

             
            }
            
                render(){
                  if(isLoginAdmin()){  
              return (
              
                      <div className="editbody editfiliere" > 
                            <div className="container table-wrapper1">
                               
                                <h1> <b>modifier Filiere </b></h1>
                            </div>
                               
                            <form noValidate onSubmit={this.onSubmit} className="myformmodif">
                                <div className="form-group ">
                                    <label htmlFor ="nom_filiere" className="col-25">Le nom du filiere </label>
                                    <input type="text" className="form-control " name="nom_filiere"  value={this.state.nom_filiere}  onChange={this.onChangeNom_filiere}/>
                                </div>
            
                                <div className="form-group ">
                                    <label htmlFor ="description" className="col-25">description</label>
                                    <textarea type="text" rows="5" className="form-control "  name="description"  value={this.state.description} onChange={this.onChangeDescription}/>
                                </div>  
                                 
                               <div className="notification">
                        
                                    <button type="submit"  class="myButtonedit">modifier</button>
                    
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

export default EditFiliere;