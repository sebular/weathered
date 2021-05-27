import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home, Forecast } from './pages/pages'

export const App = () => (
  <div className="container" style={{ maxWidth: '1024px' }}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/forecast/:cityId'>
          <Forecast />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
)