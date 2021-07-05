import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
