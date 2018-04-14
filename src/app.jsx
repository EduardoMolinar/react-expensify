import React from 'react';
import ReactDOM from 'react-dom';
import  {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter.jsx'
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(addExpense({
  description: "Water bill",
  amount: 5000,
  note: "have to pay it or will get cut off"
}));

store.dispatch(addExpense({
  description: "Gas bill",
  amount: 300,
  note: "have to pay it or will also get cut off",
  createdAt: 1000
}));

store.dispatch(addExpense({
  description: "Rent",
  amount: 109500,
  note: "have to pay it or will get cut off"
}));

const state = store.getState();

const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);

ReactDOM.render(
  jsx, document.getElementById('app'))