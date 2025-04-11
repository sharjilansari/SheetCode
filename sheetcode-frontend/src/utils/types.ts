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
  status: string;
  code: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}



export type {submissionsAll, Language, Submission};