import Header from './Components/Header'
import MainPage from './Components/MainPage';
import BooksPage from './Components/BooksPage';
import BookDetails from './Components/BookDetails';
import AuthorsPage from './Components/AuthorsPage';
import {Route, Routes} from 'react-router-dom';
import AuthorDetails from './Components/AuthorDetails';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" exact element={<MainPage/>}/>
          <Route path="/books" exact element={
            <PrivateRoute Component={BooksPage}/>
          }/>
          {/* <PrivateRoute path="/books/:id" exact element={<BookDetails/>}/>
          <PrivateRoute path="/authors" exact element={<AuthorsPage/>}/>
          <PrivateRoute path="/authors/:id" exact element={<AuthorDetails/>}/> */}
        </Routes>
    </div>
  );
}

export default App;
