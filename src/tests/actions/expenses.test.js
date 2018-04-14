import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense('123abc');
  expect(action).toEqual({type: 'REMOVE_EXPENSE', id: '123abc'});
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
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent'
  };

  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('should setup add expense action with default value', () => {
  const action = addExpense();

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  })
});