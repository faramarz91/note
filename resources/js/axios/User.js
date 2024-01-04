import Api from "@js/axios/Api.js";
const register = (formData) => {
    return Api.post('/register', formData);
}

const login = (formData) => {
    return Api.post('/login', formData);
}

const logout = () => {
    return Api.post('/logout');
}

const userInfo = () => {
    return Api.get('/api/user');
}
export default {register, login, userInfo, logout}
