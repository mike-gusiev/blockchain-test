import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Main from './Pages/Main/Main';
import Blocks from './Pages/Blocks/Blocks';
import Transaction from './Pages/Transaction/Transaction';

import Header from './Components/Header/Header';

const App = () => {
  return (
    <Router>
        <Header/>

        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/blocks' component={Blocks} />
          <Route exact path='/transaction/:id' component={Transaction}/>
        </Switch>
    </Router>
  );
};

export default App;
