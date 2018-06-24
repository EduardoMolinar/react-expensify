import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from '../../components/LoginPage';

beforeEach(() => {
  wrapper = shallow(<LoginPage/>)
});

test('should render LoginPage', () => {
  expect(wrapper).toMatchSnapshot();
});