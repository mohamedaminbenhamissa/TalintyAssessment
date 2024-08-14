import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StepsPage from "./pages/assessmentPage";
import NotFound from "./component/404";
import { API_BASE_URL } from "./utils/constants";

function App() {
  console.log(API_BASE_URL)
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