import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import Users from './components/Users';
import UsersRTK from './components/UsersRTK';

function App() {
  return (
    <div className="App">
      <Counter />
      <Users />
      <UsersRTK />
    </div>
  );
}

export default App;
