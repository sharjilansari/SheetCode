import axios, { AxiosInstance } from "axios"

class UserHandler {
    private baseUrl: string;
    private axiosInstance: AxiosInstance;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true 
        })
    }

    async getUserDetails(_id: string) {
        try {
            const response = await this.axiosInstance.get(`/:id=${_id}`);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export {UserHandler}