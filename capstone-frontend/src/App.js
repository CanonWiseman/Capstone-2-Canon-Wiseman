import './App.css';
import { BrowserRouter } from 'react-router-dom';
import {Router} from "./Router";
import { NavBar } from './NavBar';
import { useState, useEffect } from 'react';

function App() {

  const [loading, setLoading] = useState(true);
  
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Router/>
        </main> 
      </BrowserRouter>
    </div>
  );
}

export default App;
