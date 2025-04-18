import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { languages } from "./languagesArray";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeCode } from "../features/counter/codeSlice";
import ApiService from "../services/submissionHandler";
import { encodeToBase64 } from "./encodeToBase64";
import { Language, Result, submissionsAll, TestCase } from "./types";
import Loader from "../components/ui/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { LocalStorage } from "./saveToLocalStorage";
import LockedSection from "../components/ui/LockedSection";
import { givesTestCasesForGivenProblemId } from "./problemIdToTestCase";

function MonacoEditor() {
  const notify = (
    type: "success" | "error" | "info" | "warn",
    message: string
  ) => toast[type](message);

  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>();
  const [languageId, setLanguageId] = useState<number>();
  const [submissionsData, setSubmissionsData] = useState<submissionsAll>();
  const [testCases, setTestCases] = useState<TestCase[]>();
  // const [codeMap, setCodeMap] = useState<Record<string, string>>({});

  const codeMap: Record<string, string> = useAppSelector((state) => state.counter.codeMap); 
  console.log(codeMap);

  const navigate = useNavigate();
  const { id } = useParams();

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const dispatch = useAppDispatch();

  const apiService = new ApiService(import.meta.env.VITE_BASE_URL);
  const storage = new LocalStorage();

  useEffect(() => {
    if (languages.length) {
      setLanguage(languages[0].name);
      setLanguageId(languages[0].id);
    }
    if (id) {
      setTestCases(givesTestCasesForGivenProblemId(id));
    }
  }, []);

  useEffect(() => {
    if (editorRef.current && language) {
      const savedCode = codeMap?.[language] || `// Your ${language} code here`;
      const currentCode = editorRef.current.getValue();
  
      // Only update if savedCode is different from current content
      if (currentCode !== savedCode) {
        editorRef.current.setValue(savedCode);
      }
    }
  }, [language, codeMap]);

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      if (language) {
        dispatch(changeCode( {language, code}));
      }
    });
  }

  async function submitValue() {
    setLoading(true);
    if (editorRef.current) {
      if (!languageId) {
        notify("error", "Please select a language before submitting.");
        setLoading(false);
        return;
      }
      if(language){
        dispatch(changeCode( {language, code: editorRef.current.getValue()}));
      }

      if (!testCases) {
        notify("error", "No test cases found for this problem!");
        setLoading(false);
        return;
      }

      const code = editorRef.current.getValue();
      const encodedToBase64 = encodeToBase64(code);
      const allSubmissions = testCases.map((testCase) => ({
        language_id: languageId,
        source_code: encodedToBase64,
        stdin: encodeToBase64(testCase.input),
        expected_output: encodeToBase64(testCase.expectedOutput),
      }));
      const submissionsData: submissionsAll = {
        submissions: allSubmissions,
      };
      setSubmissionsData(submissionsData);

      const userData = storage.getFromLocalStorage("userData");
      let userId: string = userData.data.user._id;

      try {
        const language_id = languages.find(
          (lang) => lang.id === languageId
        )?._id;
        const data: Result = await apiService.sendSubmissions(
          submissionsData,
          userId,
          id!,
          encodedToBase64,
          language_id!
        );

        setLoading(false);
        if (data.status !== "Accepted") {
          notify("error", "Wrong Answer!!!");
        } else {
          notify("success", "Accepted!!!");
        }
        navigate(`/problems/${id}/submissions`, { state: { fromSubmit: true } });
      } catch (error) {
        setLoading(false);
        notify("error", "Something went wrong on server side!!!");
        navigate(`/problems/${id}/submissions`);
        console.log(error);
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguageId = Number(e.target.value);
    setLanguageId(selectedLanguageId);
    const selectedLanguage = languages.find(
      (language) => language.id.toString() === e.target.value
    );
    if (selectedLanguage) {
      setLanguage(selectedLanguage.name);
    }
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
          {languages.map((language: Language, index: number) => (
            <option key={index} value={language.id}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <LockedSection>
        <div className="rounded overflow-hidden border border-gray-600 h-[70vh] w-full">
          <Editor
            theme="vs-dark"
            language={language}
            value={codeMap?.[language || ""] || `// Your ${language} code here`}
            onMount={handleEditorDidMount}
            onChange={(value) => {
              if (language && value !== undefined) {
                dispatch(changeCode({ language, code: value }));
              }
            }}
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
          {loading ? <Loader /> : "Submit"}
        </button>
      </LockedSection>
      <ToastContainer />
    </div>
  );
}

export default MonacoEditor;
