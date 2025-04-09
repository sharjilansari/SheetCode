import axios from "axios";
import { submissionsAll } from "../utils/types";

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
        base64_encoded: "true",
        fields: "status,language,time,stderr",
      },
      headers: {
        "x-rapidapi-key": process.env.JUDGE_API_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };

    const pollStatus = async (): Promise<string> => {
      try {
        const response = await axios.request(options);
        const data = response.data.submissions;

        console.log("Poll Response:", data);

        const pending = data.some(
          (result: any) =>
            result?.status?.description === "In Queue" ||
            result?.status?.description === "Processing"
        );
        const rejected = data.some(
          (result: any) => result?.status?.description !== "Accepted"
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
          return "Rejected";
        } else {
          console.log("All accepted.");
          return "Accepted";
        }
      } catch (error) {
        console.error("Polling error:", error);
        return "Error";
      }
    };

    return await pollStatus();
  };

}

export { SubmissionHandler };
