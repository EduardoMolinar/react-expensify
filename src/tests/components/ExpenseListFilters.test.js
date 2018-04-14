import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altFilters} from '../fixtures/filters';

let wrapper, setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, onFocusChange;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  onFocusChange = jest.fn();

  wrapper = shallow(
  <ExpenseListFilters
    filters={filters}
    setTextFilter={setTextFilter}
    sortByDate={sortByDate}
    sortByAmount={sortByAmount}
    setStartDate={setStartDate}
    setEndDate={setEndDate}
    onFocusChange={onFocusChange}
  />
);
});

test('should render ExpenseListFilter correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilter correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });

  expect(wrapper).toMatchSnapshot();
});


test('should handle text change', () => {
  const value = "rent";
  wrapper.find('input').prop('onChange')({target: {value}});
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  const value = 'date';
  wrapper.find('select').prop('onChange')({target: {value}});
  expect(sortByDate).toBeCalled();
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').prop('onChange')({target: {value}});
  expect(sortByAmount).toBeCalled();
});

test('should handle date changes', () => {
  wrapper.find('DateRangePicker').prop('onDatesChange')(altFilters);
  expect(setEndDate).toHaveBeenLastCalledWith(altFilters.endDate);
  expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate);
});

test('should handle date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});