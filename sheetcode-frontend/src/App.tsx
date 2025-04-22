import { Outlet } from "react-router";
import Navbar from "./components/ui/NavBar";

function App() {

  return (
    <div className="bg-[#1E1E1E] shadow-lg flex gap-6 w-[100%] mx-auto h-screen overflow-auto">
      <div className="w-full">
        <Navbar />
        <Outlet /> {/* This is what enables routing to nested components */}
      </div>
    </div>
  );
}

export default App;
