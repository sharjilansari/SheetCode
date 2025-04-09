interface submissionsAll {
  submissions: 
    {
      language_id: number;
      source_code: string;
      input: string;
      expectedOutput: string;
    }[];
}
export type {submissionsAll};