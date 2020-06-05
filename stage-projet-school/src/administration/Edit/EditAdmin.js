import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './edit.css'
import Erreur404 from '../../erreurPage/erreur404'
import { isLoginAdmin } from '../loginAdmin/loginAdmin'

class EditAdmin extends React.Component{

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
            componentDidMount() {
                axios.get('http://localhost:5000/admin/'+ this.props.match.params.id)  
                  .then(response => {
                    this.setState({
                        code_admin:response.data.code_admin,
                        password:response.data.password,
                     
                    })   
                  })
                  .catch(function (error) {
                    console.log("probleeemeeeeee ");
                  })
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
              
            
                axios.post('http://localhost:5000/admin/editadmin/'+ this.props.match.params.id,Admin)
                .then(res=> console.log(res.data));
                window.location = '/listadmin';

             
            }
            
                render(){
                  if(isLoginAdmin()){  
              return (
              
                      <div className="editbody editfiliere" > 
                            <div className="container table-wrapper1">
                               
                                <h1> <b>modifier admin </b></h1>
                            </div>
                               
                            <form noValidate onSubmit={this.onSubmit} className="myformmodif">
                            <div className="form-group ">
                                <label htmlFor ="code_admin" className="col-25">Le code </label>
                                <input type="text" className="form-control " name="code_admin"  value={this.state.code_admin}  onChange={this.onChangeCode_admin}/>
                            </div>
        
                            <div className="form-group ">
                                <label htmlFor ="password" className="col-25">password</label>
                                <input type="password"  className="form-control "  name="password" value={this.state.password} onChange={this.onChangePassword}/>
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

export default EditAdmin;