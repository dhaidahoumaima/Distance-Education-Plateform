import React from 'react';
import './App.css';
import{ BrowserRouter, Route} from  'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginAdmin from './administration/loginAdmin/FormLoginAdmin';
import LoginEnseignant from './utilisateur/espace-enseignant/LoginEnseignant/FormLoginEnseignant';
import LoginEtudiant from './utilisateur/espace-etudiant/loginEtudiant/FormLoginEtudiant';
import AddEnseignant  from './administration/Add/AddEnseignant';
import AddEtudiant  from './administration/Add/AddEtudiant';
import ListEtudiant  from './administration/ListeEtudiant';
import ListeAdmin from './administration/ListeAdmin';
import ListEnseignant from './administration/ListeEnseignant';
import ListFiliere from './administration/ListeFilieres';
import ListMatiere from './administration/ListeMatiere';
import AddMatiere  from './administration/Add/AddMatiere';
import AddFiliere  from './administration/Add/AddFiliere';
import AddAdmin  from './administration/Add/AddAdmin';
import EditFiliere  from './administration/Edit/EditFiliere';
import EditAdmin  from './administration/Edit/EditAdmin';
import EditMatiere  from './administration/Edit/EditMatiere';
import EditEnseignant  from './administration/Edit/EditEnseignant';
import EditEtudiant  from './administration/Edit/EditEtudiant';
import ajout  from './utilisateur/espace-enseignant/activites/ajouter';
import modifier from './utilisateur/espace-enseignant/activites/modifier';
import ProfilEtudiant from './utilisateur/espace-etudiant/ProfilEtudiants/ProfilEtudiant';
import ProfilEnseignant from './utilisateur/espace-enseignant/ProfilEnseignant/ProfilEnseignant';
import MatiereEnseignant from './utilisateur/espace-enseignant/matiereenseignant/matiere_ens';
import MatiereEtudiant from './utilisateur/espace-etudiant/MatiereEtudiant/matiere_etudiant';
import erreur404 from './erreurPage/erreur404'
import Acceuil from './acceuil'
function App() {
  return (
    <div className="App">
    
    
      <BrowserRouter>
      <Route exact path="/" component={Acceuil}/> 
      <Route  path="/listetudiant" component={ListEtudiant}/> 
      <Route  path="/listenseignant" component={ListEnseignant}/>
      <Route  path="/ListMatiere" component={ListMatiere}/>  
      <Route  path="/Listadmin" component={ListeAdmin}/>  
      <Route  path="/listfiliere" component={ListFiliere}/> 
      <Route  path="/404" component={erreur404}/> 
      <Route path="/LoginAdmin" component={LoginAdmin}/> 
      <Route path="/ajout" component={ajout}/> 
      <Route path="/modifier/:id" component={modifier}/> 
      <Route path="/ProfilEtudiant/:id" component={ProfilEtudiant}/> 
      <Route path="/ProfilEnseignant/:id" component={ProfilEnseignant}/> 
      <Route path="/LoginEnseignant" component={LoginEnseignant}/> 
      <Route path="/LoginEtudiant" component={LoginEtudiant}/> 
      <Route path="/AddEnseignant" component={AddEnseignant}/> 
      <Route path="/AddEtudiant" component={AddEtudiant}/> 
      <Route path="/cours/:id" component={MatiereEtudiant}/> 
      <Route path="/activites/:id" component={MatiereEnseignant}/> 
      <Route path="/AddMatiere" component={AddMatiere}/> 
      <Route path="/AddFiliere" component={AddFiliere}/> 
      <Route path="/AddAdmin" component={AddAdmin}/> 
      <Route path="/EditFiliere/:id" component={EditFiliere}/> 
      <Route path="/EditAdmin/:id" component={EditAdmin}/> 
      <Route path="/EditMatiere/:id" component={EditMatiere}/> 
      <Route path="/editetudiant/:id" component={EditEtudiant}/> 
      <Route path="/EditEnseignant/:id" component={EditEnseignant}/> 
      </BrowserRouter>
     
    </div>
  );
}

export default App;
