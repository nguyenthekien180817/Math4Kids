import { Routes, Route } from "react-router-dom";
import Navbar from "./Client/components/layout/navbar/Navbar";
import HomePage from "./Client/components/pages/HomePage";
import EssayPagePage from "./Client/components/pages/EssayPage";
import MultiChoicePage from "./Client/components/pages/MultiChoicePage";
import QuizPage from "./Client/components/pages/QuizPage";
import TheoryPage from "./Client/components/pages/TheoryPage";
import CreateLessonPage from "./Client/components/pages/CreateLessonPage";
import TheoryDetailPage from "./Client/components/pages/TheoryDetailPage";
import EditLessonPage from "./Client/components/pages/EditLessonPage";
import LoginPage from "./Client/components/pages/LoginPage";
import SignupPage from "./Client/components/pages/SignupPage";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/tu-luan" element={<EssayPagePage />} />
        <Route path="/trac-nghiem" element={<MultiChoicePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/ly-thuyet" element={<TheoryPage />} />
        <Route path="/ly-thuyet/create-lesson" element={<CreateLessonPage />} />
        <Route path="/ly-thuyet/:slug" element={<TheoryDetailPage />} />
        <Route path="/ly-thuyet/:slug/edit" element={<EditLessonPage />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
