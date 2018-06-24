
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';


//to be able to implement devtools with thunk

const ComposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

//Store creation
export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      auth: authReducer
    }), 
    ComposeEnhancers(applyMiddleware(thunk))
  );

  return store;
}