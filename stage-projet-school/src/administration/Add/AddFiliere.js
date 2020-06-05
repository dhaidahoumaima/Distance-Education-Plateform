import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './add.css'
import Erreur404 from '../../erreurPage/erreur404'
import { isLoginAdmin } from '../loginAdmin/loginAdmin'


class AddFiliere extends React.Component{

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
        
        

            axios.post('http://localhost:5000/filiere/addFiliere',Filiere)
            .then(res=> console.log(res.data));
        
            this.setState({
              nom_filiere:'',
              description:'',
            })
            window.location = '/listfiliere';

        }
        
      render(){
        if(isLoginAdmin()){  
          return (
          
                  <div className="addbody  addfiliere" > 
                        <div className="container table-wrapper1">
                           
                            <h1> <b>Nouveau Filiere </b></h1>
                        </div>
                           
                        <form noValidate onSubmit={this.onSubmit} className="myformajout">
                            <div className="form-group ">
                                <label htmlFor ="nom_filiere" className="col-25">Le nom du filiere </label>
                                <input type="text" className="form-control " name="nom_filiere"  placeholder="entrer la filiere"  value={this.state.nom_filiere}  onChange={this.onChangeNom_filiere}/>
                            </div>
        
                            <div className="form-group ">
                                <label htmlFor ="description" className="col-25">description</label>
                                <textarea type="text" rows="5" className="form-control "  name="description"  placeholder="entrer la description" value={this.state.description} onChange={this.onChangeDescription}/>
                            </div>        
                           <div className="notification">
                    
                                <button type="submit"  class="myButton" >Ajouter</button>
                
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

export default AddFiliere;