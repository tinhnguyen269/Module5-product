import axios from "axios";

const API_URL = "http://localhost:8080/catorys";

export const getAllCatory = async (name) => {
    try {
        let res = await axios.get(API_URL );
        return res.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}