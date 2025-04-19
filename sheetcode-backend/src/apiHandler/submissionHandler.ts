import axios from "axios";
import { Result, submissionsAll } from "../utils/types";

class SubmissionHandler {
  fetchToken = async (submissions: submissionsAll) => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        base64_encoded: "true",
        wait: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": process.env.JUDGE_API_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: submissions,
    };

    try {
      const response = await axios.request(options);
      const tokens = response.data;
      console.log(tokens);
      return tokens;
    } catch (error) {
      console.log(error);
    }
  };

  fetchVerdict = async (resolvedAllTokens: string) => {
    //const resolvedAllTokens = token;
    console.log("Resolved Tokens:", resolvedAllTokens);

    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        tokens: resolvedAllTokens,
        base64_encoded: "false",
        fields: "status_id,status,language,time,stderr,stdout,compile_output,time,memory",
      },
      headers: {
        "x-rapidapi-key": process.env.JUDGE_API_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };

    const pollStatus = async (): Promise<Result> => {
      let result: Result;
      try {
        const response = await axios.request(options);
        const data = response.data.submissions;

        console.log("Poll Response:", data);


        const pending = data.some(
          (result: any) =>
            result?.status_id === 1 ||
            result?.status_id === 2
        );
        const rejected = data.some(
          (result: any) => result?.status_id !== 3
        );

        if (pending) {
          console.log("Still processing... polling again in 2 seconds.");
          return new Promise((resolve) => {
            setTimeout(async () => {
              const result = await pollStatus();
              resolve(result);
            }, 2000);
          });
        } else if (rejected) {
          console.log("At least one rejected.");
          return  result = {
            data: data,
            status: "Wrong Answer" 
          };
        } else {
          console.log("All accepted.");
          return result = {
            data: data,
            status: "Accepted" 
          };
        }
      } catch (error) {
        console.error("Polling error:", error);
        return result = {
          status: "Error" 
        };
      }
    };

    return await pollStatus();
  };

}

export { SubmissionHandler };
