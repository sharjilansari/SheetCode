import { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import {LocalStorage} from "../../utils/saveToLocalStorage";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // New state
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const localStorage = new LocalStorage();

  const notify = (type: "success" | "error" | "info" | "warn", message: string) => {
    toast[type](message);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login Success:", data);
        notify("success", "Logged In Successfully!")
        localStorage.saveToLocalStorage(data.data.user._id);
        navigate("/");
      } else {
        notify("error", "Log In Failed!")
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      notify("error", "Log In Failed!")
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fullName: username, email, password }), // Include username
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup Success:", data);
        notify("success", "Signed Up Successfully!");
        localStorage.saveToLocalStorage(data.data._id);
        navigate("/");
      } else {
        alert(data.message || "Signup failed");
        notify("error", "Sign Up Failed!")
      }
    } catch (error) {
      console.error("Signup Error:", error);
      notify("error", "Sign Up Failed!")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        {isLogin ? "Login" : "Signup"}
      </h2>

      {!isLogin && (
        <input
          type="text"
          placeholder="Username"
          className="border px-4 py-2 mb-3 w-64 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        className="border px-4 py-2 mb-3 w-64 text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border px-4 py-2 mb-4 w-64 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={isLogin ? handleLogin : handleSignup}
        className="bg-blue-600 text-white px-6 py-2 rounded w-64"
      >
        {isLogin ? "Login" : "Signup"}
      </button>

      <p className="mt-4 text-white">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button className="text-blue-500" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
