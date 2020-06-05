
const ID_KEY = 'id';
const NAME_KEY = "code_ens";
export const loginEnseignant = (data) => {
    localStorage.setItem(ID_KEY, data.id);
    localStorage.setItem(NAME_KEY, data.code_ens);
}

export const getID = () => localStorage.getItem(ID_KEY);
export const getNAME = () => localStorage.getItem(NAME_KEY);

export const logoutEnseignant = () => {
    localStorage.removeItem(ID_KEY);
    localStorage.removeItem(NAME_KEY);
    window.location = '/';
}

export const isLoginEnseignant = () => localStorage.getItem(NAME_KEY) ? true : false;

