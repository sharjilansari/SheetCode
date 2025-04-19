import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Description from "./components/ui/Description.tsx";
import Submissions from "./components/ui/Submissions.tsx";
import ProblemLists from "./components/ui/ProblemLists.tsx";
import ProblemLayout from "./components/ui/ProblemLayout.tsx";
import AuthPage from "./components/ui/AuthPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<App />}>
              {/* Show ProblemLists on / */}
              <Route index element={<ProblemLists />} />
              <Route path="/login" element={<AuthPage />} />

              {/* Route for selected problem view */}
              <Route path="problems/:id" element={<ProblemLayout />}>
                <Route index element={<Navigate to="description" replace />} />
                <Route path="description" element={<Description />} />
                <Route path="submissions" element={<Submissions />} />
              </Route>
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
