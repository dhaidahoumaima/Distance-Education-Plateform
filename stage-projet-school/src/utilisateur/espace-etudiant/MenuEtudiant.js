import React from "react"
import { Navbar, Nav, NavItem, NavDropdown, MenuItem ,Form,FormControl,Button} from 'react-bootstrap';
import axios from 'axios';
import './MenuEtudiant.css';
import { AiOutlineBars,AiOutlineClose} from "react-icons/ai";
import { getFILIERE } from './loginEtudiant/loginEtudiant';



export default class MenuEtudiant extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      matieres:[],
      Nom_filiere:''
      };
    }
    componentDidMount() {
        const flr=getFILIERE();
        console.log(flr)
        axios.get('http://localhost:5000/matiere/findByFiliere/'+flr)
          .then(response => {console.log(response.data)
            this.setState({ 
              matieres: response.data,
              Nom_filiere:response.data[0].nom_filiere.nom_filiere
            })

          })
          .catch((error) => {
            console.log("ma3rftch filiere ");
          })
      }
        
    render() {
        return (
            <div>
           
            <div className="sidebar">
                <header>{this.state.Nom_filiere} </header>
                <ul>
                  {this.state.matieres.map(matiere=>(
       
                  <li><a href={'../cours/'+matiere._id}>{matiere.nom_matiere} </a></li>
                  ))}
                    
                  
                 
                </ul>
            </div>
    </div>


        )}
}




