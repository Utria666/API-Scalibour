import { Route,Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
  )
}
