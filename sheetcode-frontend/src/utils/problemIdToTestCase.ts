import { test_cases } from "../problems/testCases";

export function givesTestCasesForGivenProblemId(problemId: string): { input: string, expectedOutput: string }[] | undefined {
    const testCases = test_cases.find((testCase) => testCase.problemId === problemId);
    // console.log(testCases?.testCases);
    return testCases?.testCases;
}