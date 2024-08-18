import { useState } from 'react';
import './App.css';
import Shortner from './component/Shortner';
import History from './component/History';

function App() {
  return (
    <div className="container">
      <History/>
      <Shortner/> 
    </div>
  );
}

export default App;
