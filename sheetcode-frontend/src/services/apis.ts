import axios, { AxiosInstance } from "axios";
import { submissionsAll } from "../utils/types";

class ApiService {
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async sendSubmissions(submissions: submissionsAll) {
    try {
      const response = await this.axiosInstance.post(
        "/submissions",
        { submissions}
      );
      return response.data;
    } catch (error) {
      console.error("Error saving message:", error);
      throw error;
    }
  }

  //   async fetchSubmissions(token) {
  //     try {
  //       const response = await this.axiosInstance.get(`/messages`, {
  //         params: { user: userId },
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching messages:", error);
  //       throw error;
  //     }
  //   }
}

export default ApiService;
