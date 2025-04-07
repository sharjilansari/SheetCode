import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { languages } from "./languagesArray";
import { useAppDispatch } from "../app/hooks";
import { change } from "../features/counter/counterSlice";
import ApiService from "../services/apis";
import { encodeToBase64 } from "./encodeToBase64";
import { test_cases } from "../problems/problem1/tests/input";

function MonacoEditor() {
  const [language, setLanguage] = useState<string>("C (GCC 14.1.0)");
  const [languageId, setLanguageId] = useState<number>(52);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const dispatch = useAppDispatch();

  const apiService = new ApiService(import.meta.env.VITE_BASE_URL);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(`// Your ${language} code here`);
    }
  }, [language]);

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function submitValue() {
    if (editorRef.current) {
      dispatch(change(editorRef.current.getValue()));
      const code = editorRef.current.getValue();
      const encodedToBase64 = encodeToBase64(code);
      test_cases.testCases.forEach((testCase) => {
        const input = encodeToBase64(testCase.input);
        const expectedOutput = encodeToBase64(testCase.expectedOutput)
        apiService.sendSubmissions(languageId, encodedToBase64, input, expectedOutput);
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguageId = Number(e.target.value);
    setLanguageId(selectedLanguageId);
    const selectedLanguage = languages.find(
      (language) => language.id.toString() === e.target.value
    );
    if (selectedLanguage) setLanguage(selectedLanguage.name);
  };

  return (
    <div className="bg-[#252526] text-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <label htmlFor="language-select" className="text-gray-300 font-medium">
          Choose Language:
        </label>
        <select
          id="language-select"
          onChange={handleChange}
          className="bg-[#333] text-white border border-gray-600 p-2 rounded focus:outline-none"
        >
          {languages.map((language, index) => (
            <option key={index} value={language.id}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded overflow-hidden border border-gray-600 h-[70vh] w-full">
        <Editor
          theme="vs-dark"
          defaultLanguage={language}
          defaultValue={`// Your ${language} code here`}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
          }}
          className="h-full w-full"
        />
      </div>

      <button
        onClick={submitValue}
        className="mt-4 bg-blue-600 hover:bg-blue-500 transition-all text-white py-2 px-4 rounded shadow-md w-full"
      >
        Submit
      </button>
    </div>
  );
}

export default MonacoEditor;
