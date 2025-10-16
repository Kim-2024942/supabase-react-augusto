import { BrowserRouter, Route, Routes } from "react-router";
import StudentsPage from "./pages/StudentsPage";  
import AddStudentPage from "./pages/AddStudentPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentsPage />} />
         <Route path="/addStudent" element={<AddStudentPage />} />

      </Routes>
    </BrowserRouter>
  );
}