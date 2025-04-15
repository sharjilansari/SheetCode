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

  async sendSubmissions(submissions: submissionsAll, userId: string, problemId: string, code: string, language: string) {
    try {
      const response = await this.axiosInstance.post(
        "/submissions",
        { submissions, userId, problemId, code, language}
      );
      return response.data;
    } catch (error) {
      console.error("Error saving message:", error);
      throw error;
    }
  }

  async getSubmissionsOfUserForGivenProblem(userId: string, problemId: string, skip: number, limit: number){
    try {
      const response = await this.axiosInstance.get("/get-submissions",{
        params: { userId, problemId, skip, limit }
      })
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }


}

export default ApiService;
