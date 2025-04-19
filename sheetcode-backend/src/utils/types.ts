interface submissionsAll {
  submissions: 
    {
      language_id: number;
      source_code: string;
      stdin: string;
      expected_output: string;
    }[];
}

interface Result {
  data?: {
    stdout: string;
    status_id: number;
    time: string;
    memory: number,
    stderr: string,
    compile_output: string,
    status: { id: number; description: string },
    language: { id: number; name: string }
  }[];
  status: string;
}

export type {submissionsAll, Result};