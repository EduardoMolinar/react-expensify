import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set the default state', () => {
  const state = expensesReducer(undefined, {type: '@@init'});
  expect(state).toEqual([]);
});

test('should remove expenses by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not delete expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: -1
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: {
      id: '4', 
      description: 'Papaya',
      note: '',
      amount: 4596,
      createdAt: 0
    }
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: { 
      description: 'Sandía',
      note: '',
      amount: 109500,
      createdAt: 0
    }
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], {...action.updates, id: expenses[1].id}, expenses[2]]);
});

test('should not edit expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: { 
      amount: 25657,
    }
  }

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});