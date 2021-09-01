import React from 'react';
import logo from './assets/images/logo.svg';
import BookList from './components/BookList/BookList';
import '../src/assets/css/components/App.css';
import Clock from './components/Clock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="container">
        <BookList></BookList>
      </div>

      <footer>
        <Clock></Clock>
      </footer>

    </div>
  );
}

export default App;