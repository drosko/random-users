import React from 'react';

import './App.sass';
import './custom.scss';

import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <div className="section">
          <UserList />
      </div>
    </div>
  );
}

export default App;
