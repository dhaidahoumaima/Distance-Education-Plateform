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
const Filiere = props => (
  <tr>

    <td>{props.filiere.nom_filiere}</td>
    <td>{props.filiere.description}</td>
    <td>
      <FaUserEdit />&nbsp;<Link to={"/editfiliere/"+props.filiere._id}>Edit</Link> &nbsp;|  <FaUserTimes />&nbsp;<a href="" onClick={() => { props.deleteFiliere(props.filiere._id) }}>Delete</a>
      </td>
  </tr>
)


class ListeFiliere extends React.Component{
  constructor(props) {
    super(props);
    this.deleteFiliere = this.deleteFiliere.bind(this)
   

    this.state = {filieres: [],
   
    
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/filiere/')
      .then(response => {
        this.setState({ filieres: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  deleteFiliere(id) {
    axios.delete('http://localhost:5000/filiere/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      filieres: this.state.filieres.filter(el => el._id !== id)
    })
  }

  filiereList() {
    return this.state.filieres.map(currentfiliere => {
      return <Filiere filiere={currentfiliere}  deleteFiliere={this.deleteFiliere} key={currentfiliere._id}/>;
    })
  }


  changer=(e)=>{

    var val=e.target.value;
   
      if(val == ''){
        axios.get('http://localhost:5000/filiere/')
      .then(response => {
        this.setState({ filieres: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
      }else{
       
       
          this.setState({
            filieres :this.state.filieres.filter(filiere=>filiere.nom_filiere.toLowerCase().startsWith(val.toLowerCase()))
          })
       
        
      }

    
    }

  render() {
    if(isLoginAdmin()){  
    return (
      <div style={{overflowX:"auto"}}>
             <Header/>
        <h3>Liste des filieres</h3>
        

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
          <Button  className="buttonajout"variant="info" href="../addfiliere"> <BsPersonPlusFill/> Ajouter</Button>
          
          </div>
          <br/>

        <table  className="tableau">
          <thead className="thead-light">
            <tr>
              <th>FILIERE</th>
              <th>DESCRIPTION</th>
              <th>OPTION</th>
            </tr>
          </thead>
          <tbody>
            { this.filiereList() }
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

export default ListeFiliere;