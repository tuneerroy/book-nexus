import MainPage from './Components/MainPage';
import BooksPage from './Components/BooksPage';
import BookDetails from './Components/BookDetails';
import AuthorsPage from './Components/AuthorsPage';
import {Route, Routes} from 'react-router-dom';
import AuthorDetails from './Components/AuthorDetails';
import PrivateRoute from './Components/PrivateRoute';
import LoginPage from './Components/LoginPage';
import './App.css'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" exact element={<MainPage/>}/>
          <Route path="/login" exact element={<LoginPage/>}/>
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
        </Routes>
    </div>
  );
}

export default App;
