import { Outlet } from "react-router";

function App() {
  return (
    <div className="bg-[#1E1E1E] p-6 shadow-lg flex gap-6 w-[100%] mx-auto h-[100vh]">
      <div className="w-full overflow-y-auto">
        <Outlet /> {/* This is what enables routing to nested components */}
      </div>
    </div>
  );
}

export default App;