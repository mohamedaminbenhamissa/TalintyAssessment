import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StepsPage from "./pages/assessmentPage";
import NotFound from "./component/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<StepsPage />} />
       
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;