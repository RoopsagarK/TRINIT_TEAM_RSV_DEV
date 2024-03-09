import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landingpage";
import { Layout } from "./Layout/frame";
import { Manual } from "./pages/manualsetup";
import CreateTestPage from "./pages/CreateTestPage";
import { Test } from "./pages/displaytext";
import AssessmentPage from "./pages/AssessmentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<CreateTestPage />} />
          <Route path="/custom" element={<Manual />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
