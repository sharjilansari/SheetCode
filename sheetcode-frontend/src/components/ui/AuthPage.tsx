import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { LocalStorage } from "../../utils/saveToLocalStorage";
import { useAppDispatch } from "../../app/hooks";
import { setAuth } from "../../features/counter/authSlice";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // New state
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const storage = new LocalStorage();

  const notify = (
    type: "success" | "error" | "info" | "warn",
    message: string
  ) => {
    toast[type](message);
  };

  // Check if the user is logged in when the component loads
  useEffect(() => {
    // Call an endpoint to check if the user is authenticated
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/verify-token`,
          {
            method: "GET",
            credentials: "include", // Ensure cookies are sent with the request
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setIsLogin(true); // User is logged in
          } else {
            setIsLogin(false); // Optional: explicitly mark as not logged in
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auto-login`,
          {
            method: "POST",
            credentials: "include", // to send the refreshToken cookie
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          console.log("Auto-login success:", data);
          
          // Optionally save access token if you store it in localStorage or Redux
          storage.saveToLocalStorage("userData", data);
          dispatch(setAuth(true));
          navigate("/")
        } else {
          console.log("Auto-login failed");
        }
      } catch (error) {
        console.error("Auto-login error:", error);
      }
    };
  
    autoLogin();
  }, []);
  

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Login Success:", data.data.user);
        notify("success", "Logged In Successfully!");
        dispatch(setAuth(true));
        storage.saveToLocalStorage("userData", data.data.user);
        navigate("/");
      } else {
        notify("error", "Log In Failed!");
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      notify("error", "Log In Failed!");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ fullName: username, email, password }), // Include username
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Signup Success:", data.data.user);
        notify("success", "Signed Up Successfully!");
        dispatch(setAuth(true));
        storage.saveToLocalStorage("userData", data.data.user);
        navigate("/");
      } else {
        alert(data.message || "Signup failed");
        notify("error", "Sign Up Failed!");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      notify("error", "Sign Up Failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80%] sm:mt-12">
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
