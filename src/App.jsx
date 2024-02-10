import './css/App.css';
import Search from './Page';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Nome da pagina

document.title = 'GitHub Finder';

function App() {

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
            <Route path='/' element={<Search />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
