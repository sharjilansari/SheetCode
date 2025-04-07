import { response, Response } from "express";
import axios from "axios";

class SubmissionHandler {   
  fetchToken = async (
    languageId: string,
    code: string,
    input: string,
    expectedOutput: string
  ) => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
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
      data: {
        language_id: languageId,
        source_code: code,
        stdin: input,
        expected_output: expectedOutput,
        // callback_url:{/*callback url*/}
      },
    };

    try {
      const response = await axios.request(options);
      const token = response.data.token;
      console.log(response.data.token); //this gives an object which has token ie response.data.token
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  fetchVerdict = async (token: Promise<any>) => {
    const resolvedToken = await token;
  
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${resolvedToken}?base64_encoded=false&fields=stdout,stderr,status_id,language_id,status`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": process.env.JUDGE_API_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };
  
    // Recursive polling wrapped in a promise
    const pollStatus = async (): Promise<any> => {
      const response = await axios.request(options);
      const status = response.data.status.description;
        
      if (status !== "Processing") {
        console.log("Status:", status, "- Stopping.");
        return response.data.status.description;
      }
  
      // Wait 2 seconds and try again
      return new Promise((resolve) => {
        setTimeout(async () => {
          const result = await pollStatus();
          resolve(result);
        }, 2000);
      });
    };
  
    // Await the final verdict and return
    const result = await pollStatus();
    return result;
  };

}

export { SubmissionHandler };
