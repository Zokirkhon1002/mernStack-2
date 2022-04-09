import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import Update from "./pages/Update";
import { useState } from "react";
import Loader from "./loader/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoader = (isBoolen) => {
    setIsLoading(isBoolen);
  };
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <div className="raw">
          <div className="col-lg-12 offset-lg-0">
            {isLoading ? (
              <Loader />
            ) : (
              <Routes>
                <Route path="/" exact element={<Main />} />
                <Route
                  path="/add"
                  element={<AddBook handleLoader={handleLoader} />}
                />
                <Route
                  path="/update/:id"
                  element={<Update handleLoader={handleLoader} />}
                />
              </Routes>
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
