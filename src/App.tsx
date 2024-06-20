import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StepsPage from "./pages/assessmentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StepsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
