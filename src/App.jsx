import './css/App.css';
import UserSearch from './components/Search';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  document.title = 'GitHub Finder';
    return (
      
    <div className="App">
      <header className="App-header">
      <div className='Title'>
        <h1>
          Teste de FrontEnd
        </h1>
        </div>
        <br></br>
        <BrowserRouter>
         <Routes>
          <Route path='/' element={<UserSearch />}/>
            </Routes>
        </BrowserRouter>        
      </header>
    </div>
    );
}

export default App;
