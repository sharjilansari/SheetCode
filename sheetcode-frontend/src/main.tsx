import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Description from "./components/ui/Description.tsx";
import Submissions from "./components/ui/Submissions.tsx";
import ProblemLists from "./components/ui/ProblemLists.tsx";
import ProblemLayout from "./components/ui/ProblemLayout.tsx";
import AuthPage from "./components/ui/AuthPage.tsx";
import ProtectedRoute from "./components/ui/ProtectedRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            {/* Show ProblemLists on / */}
            <Route index element={<ProblemLists />} />
            <Route path="/login" element={<AuthPage />}/>

            {/* Route for selected problem view */}
            <Route path="problems/:id" element={<ProtectedRoute><ProblemLayout /></ProtectedRoute>}>
              <Route index element={<ProtectedRoute><Navigate to="description" replace /></ProtectedRoute>} />
              <Route path="description" element={<ProtectedRoute><Description /></ProtectedRoute>} />
              <Route path="submissions" element={<ProtectedRoute><Submissions /></ProtectedRoute>} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
