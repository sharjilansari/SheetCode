import axios from "axios";
import { Language } from "../utils/types";

const getAllLanguages = async (): Promise<Language[]> => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/languages`);
    console.log(response.data.data)
    return response.data.data;
}

export {getAllLanguages};