
const ID_KEY = 'id';
const NAME_KEY = "code_admin";
export const loginAdmin = (data) => {
    localStorage.setItem(ID_KEY, data.id);
    localStorage.setItem(NAME_KEY, data.code_admin);
}

export const getID = () => localStorage.getItem(ID_KEY);
export const getNAME = () => localStorage.getItem(NAME_KEY);

export const logoutAdmin = () => {
    localStorage.removeItem(ID_KEY);
    localStorage.removeItem(NAME_KEY);
    window.location = '/';
}

export const isLoginAdmin = () => localStorage.getItem(NAME_KEY) ? true : false;

