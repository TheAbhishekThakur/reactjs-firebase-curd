import "./App.css";
import React, { lazy, Suspense } from "react";
const Home = lazy(() => import("./Pages/Home"));

const renderLoader = () => <p>Loading....</p>;

function App() {
  return (
    <div className="App">
      <Suspense fallback={renderLoader()}>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
