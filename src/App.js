import {Switch } from '@vkontakte/vkui';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch as Routes,
  Route,
  Link,
} from 'react-router-dom';

import Panel from './panels/Panel';


const App = () => (
  <Router>
	<Routes>
        <Route path="/statistics" component={()=><h2>Stat</h2>}/>
        <Route path="/offer" component={()=><h2>Offer</h2>}/>
        <Route path="/" component={()=><h2>Voting</h2>}/>
      </Routes>
	  <Panel/>
  </Router>
);

export default App;