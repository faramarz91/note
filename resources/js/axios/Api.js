import axios from "axios";

const Api = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "X-Requested-With": 'XMLHttpRequest',
        "Accept": 'application/json',
    }
});

export default Api;
