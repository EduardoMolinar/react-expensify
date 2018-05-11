
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

//to be able to implement devtools with thunk

const ComposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

//Store creation
export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }), 
    ComposeEnhancers(applyMiddleware(thunk))
  );

  return store;
}