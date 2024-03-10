import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landingpage";
import { Layout } from "./Layout/frame";
import { Manual } from "./pages/manualsetup";
import CreateTestPage from "./pages/CreateTestPage";
import { Test } from "./pages/displaytext";
import { QuestionProvider } from "./QuestionsContext";
import AssessmentPage from "./pages/AssessmentPage";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import AnswerProvider from "./AnwersContext";
import Dashboard from "./pages/Dashboard";
import { DurationProvider } from "./context/useDuration";

function App() {
  return (
    <BrowserRouter>
      <QuestionProvider>
        <AnswerProvider>
          <DurationProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create" element={<CreateTestPage />} />
                <Route path="/custom" element={<Manual />} />
                <Route path="/assessment" element={<AssessmentPage />} />
                <Route path="/test" element={<Test />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </DurationProvider>
        </AnswerProvider>
      </QuestionProvider>
    </BrowserRouter>
  );
}

export default App;
