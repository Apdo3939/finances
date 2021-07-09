import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cadastrar } from './pages/Cadastrar';
import { Editar } from './pages/Editar';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/cadastrar' exact component={Cadastrar} />
        <Route path='/editar/:id' exact component={Editar} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
