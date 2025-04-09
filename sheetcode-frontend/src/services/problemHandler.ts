import axios, { AxiosInstance } from "axios";

class ProblemHandler {
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

  async fetchProblems() {
    try {
        const response = await this.axiosInstance.get("/problems");
        return response.data.data.problems;
    } catch (error) {
        console.log(error);
    }
  }

  async fetchOneProblem(id: string) {
    try {
        const response = await this.axiosInstance.get(`/problems/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
  }
}

export {ProblemHandler};