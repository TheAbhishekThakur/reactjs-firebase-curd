import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./Pages/Login"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const AddNewUser = lazy(() => import("./Pages/AddUser"));

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-item-center">
            Loading...
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user/add" element={<AddNewUser />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
