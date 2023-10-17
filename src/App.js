import { Routes, Route } from "react-router-dom";
import Navbar from "./Client/components/layout/navbar/Navbar";
import HomePage from "./Client/components/pages/HomePage";
import Account from "./Client/components/pages/Account";
import QuizPage from "./Client/components/pages/QuizPage";
import TheoryPage from "./Client/components/pages/TheoryPage";
import TheoryDetailPage from "./Client/components/pages/TheoryDetailPage";
import LoginPage from "./Client/components/pages/LoginPage";
import SignupPage from "./Client/components/pages/SignupPage";
import CreateMultiTestPage from "./Client/components/pages/MultiTestPages/CreateMultiTestPage"; //Multi
import MultiChoicePage from "./Client/components/pages/MultiTestPages/MultiChoicePage"; // Multi
import SubmittedMultiTestPage from "./Client/components/pages/MultiTestPages/SubmittedMultiTestPage"; //Multi
import DetailedMultiChoicePage from "./Client/components/pages/MultiTestPages/DetailedMultiChoicePage"; // Multi
import CreateEssayTest from "./Client/components/pages/EssayTestPages/CreateEssayTestPage";
import EssayPage from "./Client/components/pages/EssayTestPages/EssayPage";
import DetailedEssayPage from "./Client/components/pages/EssayTestPages/DetailedEssayTestPage";
import SubmittedEssayTestPage from "./Client/components/pages/EssayTestPages/SubmittedEssayTestPage";

import "./App.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/tu-luan" element={<EssayPage />} />
        <Route path="/trac-nghiem" element={<MultiChoicePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/ly-thuyet" element={<TheoryPage />} />

        <Route path="/ly-thuyet/:slug" element={<TheoryDetailPage />} />

        <Route
          path="/:slug/create-multichoice"
          element={<CreateMultiTestPage />}
        />
        <Route
          path="/:slug/store-finished-multi/:id/detail"
          element={<SubmittedMultiTestPage />}
        />
        <Route path="/:slug" element={<Account />} />
        <Route
          path="/trac-nghiem/:slug"
          element={<DetailedMultiChoicePage />}
        />
        <Route path="/tu-luan/:slug" element={<DetailedEssayPage />} />
        <Route path="/:slug/create-essay" element={<CreateEssayTest />} />
        <Route
          path="/:slug/store-finished-essay/:id/detail"
          element={<SubmittedEssayTestPage />}
        />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
