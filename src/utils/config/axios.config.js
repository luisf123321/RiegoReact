import axios from "axios";

export default axios.create({
    baseURL:"https://riegoback.herokuapp.com/",
    responseType:'json',
    timeout:6000
}
)