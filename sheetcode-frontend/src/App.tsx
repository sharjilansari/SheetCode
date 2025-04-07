import "./App.css";
import ProblemTabs from "./components/ui/ProblemTabs";
import MonacoEditor from "./utils/MonacoEditor";

function App() {
  return (
    <>
      <div className="bg-[#1E1E1E] p-6 shadow-lg flex gap-6 w-[100%] mx-auto h-[100vh]">
        <div className="w-1/2 overflow-y-auto">
          <ProblemTabs />
        </div>
        <div className="w-1/2">
          <MonacoEditor />
        </div>
      </div>
    </>
  );
}

export default App;
