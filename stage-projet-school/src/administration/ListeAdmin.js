import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserEdit, FaCentercode } from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';
import { Button} from 'react-bootstrap';
import {BsPersonPlusFill ,BsTrashFill} from 'react-icons/bs';
import Erreur404 from '../erreurPage/erreur404'
import { isLoginAdmin } from './loginAdmin/loginAdmin'
import './list.css';
import { Header}  from './Header-admin';
const Admin = props => (
  <tr>
  
    <td>{props.admin.code_admin }</td>
    <td>{props.admin.password}</td>
    <td>
      <FaUserEdit />&nbsp;<Link to={"/editadmin/"+props.admin._id}>Edit</Link> &nbsp;|  <FaUserTimes />&nbsp;<a href="" onClick={() => { props.deleteadmin(props.admin._id) }}>Delete</a>
      </td>
  </tr>
)

class ListeAdmin extends React.Component{
  constructor(props) {
    super(props);
    this.deleteadmin = this.deleteadmin.bind(this)

    this.state = {admins: [],
        recherche_type:'cne' 
      
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/admin/')
      .then(response => {
        this.setState({admins: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  deleteadmin(id) {
    axios.delete('http://localhost:5000/admin/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      admins: this.state.admins.filter(el => el._id !== id)
    })
  }

  adminList() {
    return this.state.admins.map(currentadmin => {
      return <Admin admin={currentadmin}  deleteMatiere={this.deleteadmin} key={currentadmin._id}/>;
    })
  }
 
  changer=(e)=>{

    var val=e.target.value;
   
      if(val == ''){
        axios.get('http://localhost:5000/admin/')
      .then(response => {
        this.setState({ admins: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
      }else{
       
       
          this.setState({
            admins :this.state.admins.filter(adm=>adm.code_admin.toLowerCase().startsWith(val.toLowerCase()))
          })
       
        
      }

    
    }
  render() {
    if(isLoginAdmin()){  
    return (
      <div style={{overflowX:"auto"}}>
             <Header/>
        <h3>Liste des admins</h3>
        <div className="container" style={{marginLeft:-300}}>
          <div className="row">
            <div className="col-md-12">
                    <div className="input-group" id="adv-search">
                        <input type="text" class="form-control" placeholder="chercher ..." onChange={this.changer}   />
                    
                    </div>
            </div>
          </div>
      </div>
      <div >
          <Button  className="buttonajout"variant="info" href="../addadmin"> <BsPersonPlusFill/> Ajouter</Button>
          
          </div>
        <br/>
        <table className="tableau">
          <thead className="thead-light">
            <tr>
              <th>CODE D'ADMIN</th>
              <th>MOT DE PASSE </th>
              <th>OPTION </th>
         
   
          
            </tr>
          </thead>
          <tbody>
            { this.adminList() }
          </tbody>
        </table>
      </div>
    );
  }else{
    return(
      <Erreur404/>
    );
  }
  }
}

export default ListeAdmin;