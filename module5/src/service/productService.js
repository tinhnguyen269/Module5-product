import axios from "axios";

const API_URL = "http://localhost:8080/products";

export const getAllProduct = async (name) => {
    try {
        let res = await axios.get(API_URL + "?name_like=" + name);
        return res.data;
    } catch (e) {
        console.log(e);
        return [];  // Trả về mảng rỗng nếu có lỗi
    }
}
export const saveProduct = async (product) =>{
    try{
        await axios.post(API_URL, product);
        return true;
    }catch (e){
        console.log(e);
        return false;
    }
}


