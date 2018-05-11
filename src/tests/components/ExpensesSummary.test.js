import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary.jsx';
import expenses from '../fixtures/expenses';

test('should render Expeneses summary 1', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render Expenses summary 2', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={324231221}/>);
  expect(wrapper).toMatchSnapshot();
});