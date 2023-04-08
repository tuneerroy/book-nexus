import Header from './Components/Header'
import MainPage from './Components/MainPage';
import BooksPage from './Components/BooksPage';
import BookDetails from './Components/BookDetails';
import AuthorsPage from './Components/AuthorsPage';
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" exact element={<MainPage/>}/>
          <Route path="/books" exact element={<BooksPage/>}/>
          <Route path="/books/:id" exact element={<BookDetails/>}/>
          <Route path="/authors" exact element={<AuthorsPage/>}/>
          <Route path="/authors/:id" exact element={<AuthorsPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
