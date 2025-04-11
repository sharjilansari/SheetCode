interface submissionsAll {
  submissions: 
    {
      language_id: number;
      source_code: string;
      stdin: string;
      expected_output: string;
    }[];
}

export type {submissionsAll};