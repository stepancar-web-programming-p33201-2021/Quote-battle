import {Switch } from '@vkontakte/vkui';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch as Routes,
  Route,
  Link,
} from 'react-router-dom';

import Panel from './panels/Panel';
import Election from './Election';
import Offer from './Offer';
import Statistics from './Statistics';


const App = () => (
  <Router>
	<Routes>
        <Route path="/statistics" component={Statistics}/>
        <Route path="/offer" component={Offer}/>
        <Route path="/" component={Election}/>
      </Routes>
	  <Panel/>
  </Router>
);

export default App;