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
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error saving submission:", error);
      throw error;
    }
  }

  async getSubmissionsOfUserForGivenProblem(userId: string, problemId: string, skip: number, limit: number){
    try {
      const response = await this.axiosInstance.get("/get-submissions",{
        params: { userId, problemId, skip, limit }
      })
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleSubmissionOfUserForGivenProblem(id: string){
    try {
      const response = await this.axiosInstance.get(`/submission-details?id=${id}`);
      return response.data.data
    } catch (error) {
      console.log(error);
    }
  }


}

const x = new ApiService(import.meta.env.VITE_BASE_URL);
const response = await x.getSingleSubmissionOfUserForGivenProblem('68017465711ecd52f4268fc2');
console.log(response);

export default ApiService;
