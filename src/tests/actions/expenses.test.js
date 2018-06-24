import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense, startRemoveExpense, setExpenses, startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid'
const defaultAuthState = { auth: {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};

  expenses.forEach(({id, description, note,  amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  })
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});
test('should setup remove expense action object', () => {
  const action = removeExpense('123abc');
  expect(action).toEqual({type: 'REMOVE_EXPENSE', id: '123abc'});
});

test('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense(id)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});
test('should setup add expense action object', () => {
  const action = editExpense('123abc', {
    description: 'gasto',
    amount: 10000,
    createdAt: 100,
    note: "some data"
  });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      description: 'gasto',
      amount: 10000,
      createdAt: 100,
      note: "some data"
    }
  });
});

test('should setup add expense action with provided value', () => {

  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenses[2],
      id: expect.any(String)
    }
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);

  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'this one is better',
    createdAt: 100
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();;
  });

});

test('should add expense witn defaults to database and store', () => {
  
});

test('should setup set expenses action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});