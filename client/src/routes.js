import { Switch, Route } from 'react-router-dom';

import Projects from './pages/Projects';
import News from './pages/News';
import About from './pages/About';
import Contact from './pages/Contact';

const Routes = () => (
  <Route>
    <Switch>
      <Route path='/home' element={<Home />} />
      <Route path='/news' element={<News />} />
      <Route path='/projects' element={<Projects />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
    </Switch>
  </Route>
);

export default Routes;
