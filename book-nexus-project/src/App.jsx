import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import BooksPage from "./Components/BooksPage";
import BookDetails from "./Components/BookDetails";
import AuthorDetails from "./Components/AuthorDetails";
import PrivateRoute from "./Components/PrivateRoute";
import LoginPage from "./Components/LoginPage";
import NotFoundPage from "./Components/NotFoundPage";
import RecsPage from "./Components/RecsPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route
          path="/favorites"
          exact
          element={<PrivateRoute Component={HomePage} />}
        />
        <Route
          path="/books"
          exact
          element={<PrivateRoute Component={BooksPage} />}
        />
        <Route
          path="/books/:id"
          exact
          element={<PrivateRoute Component={BookDetails} />}
        />
        <Route
          path="/authors/:id"
          exact
          element={<PrivateRoute Component={AuthorDetails} />}
        />
        <Route
          path="/recommendations"
          exact
          element={<PrivateRoute Component={RecsPage} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
