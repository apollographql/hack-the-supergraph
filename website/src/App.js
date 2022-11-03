import Layout from './layout/Layout';
import {Fallback, HomePage, Product} from './pages';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route>
            <Fallback />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
