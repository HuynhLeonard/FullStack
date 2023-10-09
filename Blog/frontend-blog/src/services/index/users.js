import axios from 'axios';

export const signup = ({name, email, password}) => {
    try {
        const data = axios.post("/api/users/register", {name,email,password});
        return data;
    } catch (err) {
        console.log(err);
        if(err.response && err.response.data.message){
            throw new Error(err.response.data.message);
        }
        throw new Error(err.message);
    }
}