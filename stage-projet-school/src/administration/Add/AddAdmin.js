import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './add.css';
import Erreur404 from '../../erreurPage/erreur404'
import { isLoginAdmin } from '../loginAdmin/loginAdmin'



class AddAdmin extends React.Component{

        constructor(props) {
        
            super(props)
                 
            this.onChangeCode_admin=this.onChangeCode_admin.bind(this);
            this.onChangePassword=this.onChangePassword.bind(this);
            this.onSubmit=this.onSubmit.bind(this);

            this.state={
                code_admin:'',
                password:'', 
               
            }
             
        
        }

        onChangeCode_admin(e){
              this.setState({
                 code_admin: e.target.value });
          }  
        onChangePassword(e){
            this.setState({
               password: e.target.value });
        }
     
        onSubmit(e){
            e.preventDefault();
        
            const Admin = { 
              code_admin:this.state.code_admin,
              password:this.state.password,
            }
        
        

            axios.post('http://localhost:5000/admin/addAdmin',Admin)
            .then(res=> console.log(res.data));
        
            this.setState({
              code_admin:'',
              password:'',
            })
            window.location = '/listadmin';

        }
        
      render(){
        if(isLoginAdmin()){  
          return (
          
                  <div className="addbody  addfiliere" > 
                        <div className="container table-wrapper1">
                           
                            <h1> <b>Nouveau Admin</b></h1>
                        </div>
                           
                        <form noValidate onSubmit={this.onSubmit} className="myformajout">
                            <div className="form-group ">
                                <label htmlFor ="code_admin" className="col-25">Le code </label>
                                <input type="text" className="form-control " name="code_admin"  placeholder="entrer le code"  value={this.state.code_admin}  onChange={this.onChangeCode_admin}/>
                            </div>
        
                            <div className="form-group ">
                                <label htmlFor ="password" className="col-25">password</label>
                                <input type="password"  className="form-control "  name="password"  placeholder="entrer le password" value={this.state.password} onChange={this.onChangePassword}/>
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

export default AddAdmin;