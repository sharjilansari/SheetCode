export const test_cases = [
    {
      _id: "67f91cad00a6d55b7e9ef562",
      problemId: "67f5599c64f0ddfc80553389",
      testCases: [
        { input: "3\n[1,2,4]\n3\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]" },
        { input: "0\n[]\n0\n[]", expectedOutput: "[]" },
        { input: "0\n[]\n1\n[0]", expectedOutput: "[0]" },
        { input: "3\n[2,3,7]\n3\n[1,5,8]", expectedOutput: "[1,2,3,5,7,8]" },
        { input: "3\n[1,2,3]\n3\n[4,5,6]", expectedOutput: "[1,2,3,4,5,6]" }
      ]
    },
    {
      _id: "67f91cad00a6d55b7e9ef563",
      problemId: "67f5599c64f0ddfc8055338c",
      testCases: [
        { input: "4\n[1,3,5,6]\n5", expectedOutput: "2" },
        { input: "4\n[1,3,5,6]\n2", expectedOutput: "1" },
        { input: "4\n[1,3,5,6]\n7", expectedOutput: "4" },
        { input: "4\n[1,3,5,6]\n0", expectedOutput: "0" },
        { input: "1\n[1]\n1", expectedOutput: "0" }
      ]
    },
    {
      _id: "67f91cad00a6d55b7e9ef564",
      problemId: "67f5599c64f0ddfc80553384",
      testCases: [
        { input: "123", expectedOutput: "321" },
        { input: "-123", expectedOutput: "-321" },
        { input: "120", expectedOutput: "21" },
        { input: "0", expectedOutput: "0" },
        { input: "1534236469", expectedOutput: "0" }
      ]
    },
    {
      _id: "67f91cad00a6d55b7e9ef565",
      problemId: "67f5599c64f0ddfc80553385",
      testCases: [
        { input: "121", expectedOutput: "true" },
        { input: "-121", expectedOutput: "false" },
        { input: "10", expectedOutput: "false" },
        { input: "12321", expectedOutput: "true" },
        { input: "0", expectedOutput: "true" }
      ]
    },
    {
      _id: "67f91cad00a6d55b7e9ef566",
      problemId: "67f5599c64f0ddfc8055338a",
      testCases: [
        { input: "3\n[1,1,2]", expectedOutput: "2" },
        { input: "10\n[0,0,1,1,1,2,2,3,3,4]", expectedOutput: "5" },
        { input: "2\n[1,2]", expectedOutput: "2" },
        { input: "3\n[1,1,1]", expectedOutput: "1" },
        { input: "0\n[]", expectedOutput: "0" }
      ]
    },
    {
      _id: "67f91cad00a6d55b7e9ef567",
      problemId: "67f5599c64f0ddfc80553388",
      testCases: [
        { input: "()[]{}", expectedOutput: "true" },
        { input: "(]", expectedOutput: "false" },
        { input: "([{}])", expectedOutput: "true" },
        { input: "(((", expectedOutput: "false" },
        { input: "{[()]}", expectedOutput: "true" }
      ]
    },
    {
      _id: "67f91cad00a6d55b7e9ef568",
      problemId: "67f5599c64f0ddfc8055338b",
      testCases: [
        { input: "hello\nll", expectedOutput: "2" },
        { input: "aaaaa\nbba", expectedOutput: "-1" },
        { input: "needle\nneedle", expectedOutput: "0" },
        { input: "abc\nc", expectedOutput: "2" },
        { input: "mississippi\nissip", expectedOutput: "4" }
      ]
    },
    {
      _id: "67f91cad00a6d55b7e9ef569",
      problemId: "67f5599c64f0ddfc80553387",
      testCases: [
        { input: '3\n["flower","flow","flight"]', expectedOutput: "fl" },
        { input: '3\n["dog","racecar","car"]', expectedOutput: "" },
        { input: '3\n["interspecies","interstellar","interstate"]', expectedOutput: "inters" },
        { input: '1\n["a"]', expectedOutput: "a" },
        { input: '2\n["","b"]', expectedOutput: "" }
      ]
    },
    {
      _id: "67f91cad00a6d55b7e9ef56a",
      problemId: "67f5599c64f0ddfc80553383",
      testCases: [
        { input: "4\n[2,7,11,15]\n9", expectedOutput: "[0,1]" },
        { input: "3\n[3,2,4]\n6", expectedOutput: "[1,2]" },
        { input: "2\n[3,3]\n6", expectedOutput: "[0,1]" },
        { input: "5\n[1,2,3,4,5]\n9", expectedOutput: "[3,4]" },
        { input: "4\n[1,5,3,2]\n6", expectedOutput: "[1,3]" }
      ]
    },
    {
      _id: "67f91cad00a6d55b7e9ef56b",
      problemId: "67f5599c64f0ddfc80553386",
      testCases: [
        { input: "III", expectedOutput: "3" },
        { input: "LVIII", expectedOutput: "58" },
        { input: "MCMXCIV", expectedOutput: "1994" },
        { input: "IX", expectedOutput: "9" },
        { input: "XL", expectedOutput: "40" }
      ]
    }
  ];