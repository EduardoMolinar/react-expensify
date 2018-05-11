import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should test expenses total selector when no expenses', () => {
  const result = selectExpensesTotal();
  expect(result).toBe(0);
});

test('should return expense value if only one expense.', () => {
  const result = selectExpensesTotal([expenses[0]]);
  expect(result).toBe(expenses[0].amount)
});

test('should return added up expenses amount', () => {
  const result = selectExpensesTotal(expenses);
  expect(result).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});