
import React from "react"
import { Navbar, Nav, NavItem, NavDropdown, MenuItem ,Form,FormControl,Button} from 'react-bootstrap';
import axios from 'axios';
import './MenuEnseignant.css';
import { AiOutlineBars,AiOutlineClose} from "react-icons/ai";
import { getID } from './LoginEnseignant/loginEnseignant';


export default class MenuEnseignant extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        matieres:[],
      };
    }
    componentDidMount() {
        const idens=getID();
        console.log(idens)
        axios.get('http://localhost:5000/matiere/findByEnseignant/'+idens)
          .then(response => {console.log(response.data)
            this.setState({ 
              matieres: response.data,
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
                <header>les matieres </header>
                <ul>
                  {this.state.matieres.map(matiere=>(
       
                  <li><a href={'../activites/'+matiere._id}>{matiere.nom_filiere.nom_filiere} : {matiere.nom_matiere} </a></li>
                  ))}
                    
                  
                 
                </ul>
            </div>
    </div>


        )}
}




