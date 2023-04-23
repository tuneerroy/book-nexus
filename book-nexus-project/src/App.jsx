import HomePage from './Components/HomePage';
import BooksPage from './Components/BooksPage';
import BookDetails from './Components/BookDetails';
import AuthorsPage from './Components/AuthorsPage';
import {Route, Routes} from 'react-router-dom';
import AuthorDetails from './Components/AuthorDetails';
import PrivateRoute from './Components/PrivateRoute';
import LoginPage from './Components/LoginPage';
import NotFoundPage from './Components/NotFoundPage';
import './App.css'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" exact element={<LoginPage />}/>
          <Route path="/home" exact element={
            <PrivateRoute Component={HomePage}/>
          }/>
          <Route path="/books" exact element={
            <PrivateRoute Component={BooksPage}/>
          }/>
          <Route path="/books/:id" exact element={
            <PrivateRoute Component={BookDetails}/>
          }/>
          <Route path="/authors" exact element={
            <PrivateRoute Component={AuthorsPage}/>
          }/>
          <Route path="/authors/:id" exact element={
            <PrivateRoute Component={AuthorDetails}/>
          }/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}

export default App;
