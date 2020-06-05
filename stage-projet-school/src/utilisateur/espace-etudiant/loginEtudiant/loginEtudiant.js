
const ID_KEY = 'id';
const NAME_KEY = "cne";
const FILIERE_KEY = "nom_filiere";

export const loginEtudiant = (data) => {
  
    localStorage.setItem(ID_KEY, data.id);
    localStorage.setItem(NAME_KEY, data.cne);
    localStorage.setItem(FILIERE_KEY, data.nom_filiere);

}

export const getID = () => localStorage.getItem(ID_KEY);
export const getNAME = () => localStorage.getItem(NAME_KEY);
export const getFILIERE = () => localStorage.getItem(FILIERE_KEY);

export const logoutEtudiant = () => {
    localStorage.removeItem(ID_KEY);
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem(FILIERE_KEY); 
    window.location = '/';
}

export const isLoginEtudiant = () => localStorage.getItem(NAME_KEY) ? true : false;

