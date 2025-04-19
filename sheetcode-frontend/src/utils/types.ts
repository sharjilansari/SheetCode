interface submissionsAll {
  submissions: 
    {
      language_id: number;
      source_code: string;
      stdin: string;
      expected_output: string;
    }[];
}

 interface Language {
  _id: string;
  id: number;
  name: string;
}

interface Submission {
  _id: string ;
  userId: string;
  problemId: string;
  status: Result;
  code: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TestCase {
  input: string;
  expectedOutput: string;
};

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


export type {submissionsAll, Language, Submission, TestCase, Result};