import React from 'react';
import { Router, Route, Switch, Link} from 'react-router-dom';
//to be able to route to login and logout since firebase cant see components history
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.jsx';
import AddExpensePage from '../components/AddExpensePage.jsx';
import EditExpensePage from '../components/EditExpensePage.jsx';
import NotFoundPage from '../components/NotFoundPage.jsx';
import LoginPage from '../components/LoginPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';

//to be able to access history from firebase auth
  export const history = createHistory();

  const AppRouter = () => (
    //used to be BrowserRouter that creates its own history
    //changed to be able to pass own history
    <Router history={history}>
      <div>          
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true}/>

          <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
  
          <PrivateRoute path="/create" component={AddExpensePage}/>
  
          <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
  
         <Route component={NotFoundPage}/>
        </Switch>
      </div>
    </Router>
  );

  export default AppRouter;