import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCar from "./components/AddCar";
import CarList from "./components/CarList";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CarDetail from "./components/CarDetail";
import AddEditCar from "./components/AddEditCar";
import Navbar from "./components/Navbar";
// import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      {/* <Login /> */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/add" element={<AddCar />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/cars/edit/:id" element={<AddEditCar />} />
      </Routes>
    </Router>
  );
}

export default App;
