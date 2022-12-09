import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Pages/Home"));
const renderLoader = () => <p>Loading....</p>;

function App() {
  return (
    <div className="App">
      <Suspense fallback={renderLoader()}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              {/* <Route path="login" element={<Login />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
