import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
import { Map } from 'core-js';
import { STATUS_CODES } from 'http';

// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '', 
    amount = 0,
    createdAt= 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({id}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
  sortBy: 'date'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
  sortBy: 'amount'
});

// SORT_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

//Expenses Reducers
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
      break;
    case 'REMOVE_EXPENSE':
      return state.filter(({id}) => id !== action.id);
      break;
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
      break;
    default:
      return state;
      break;
  }
};

//Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {

    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
      break;

    case 'SORT_BY_DATE':
    case 'SORT_BY_AMOUNT': 
      return {
        ...state,
        sortBy: action.sortBy
      }
      break;
      
    // case 'SORT_BY_AMOUNT':
    //   return {
    //     ...state,
    //     sortBy: action.sortBy
    //   }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
      break;
    
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
      break;

    default:
      return state;
      break;
  }
};

//get visible expenses

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ?  1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
}

//Store creation


const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
}));

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
});

  const expenseOne = store.dispatch(addExpense({
    description: 'Rent',
    amount: 100,
    createdAt: -1000
  }));

  const expenseTwo = store.dispatch(addExpense({
    description: 'coffea',
    amount: 300,
    createdAt: 1000 
  }));

// store.dispatch(removeExpense({
//   id: expenseOne.expense.id
// }));

// store.dispatch(setTextFilter('kksajdks'));

// store.dispatch(setTextFilter());

// store.dispatch(editExpense(expenseTwo.expense.id), { amount: 500});

store.dispatch(sortByAmount());

// store.dispatch(sortByDate());

// store.dispatch(setStartDate(1000));

// store.dispatch(setStartDate());

// store.dispatch(setEndDate(999));

// store.dispatch(setTextFilter("Coff"));

const demoState = {
  expenses: [{
    id: 'pdjasdoiajsofj',
    description: 'January Rent',
    note: 'This was the final pyment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', //date or amount
    startDate: undefined,
    endDate: undefined
  }
};