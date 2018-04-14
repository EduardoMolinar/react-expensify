import {createStore} from 'redux';

//Action generators - functions that return action objects

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ({count} = {}) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET'
});

const countReducer = (state = {count: 0}, action) => {
  
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
      break;

    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
      break; 
    
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state;
      break;
  }

}

const store = createStore(countReducer);

console.log(store.getState());

const unsuscribe = store.subscribe(() => {
  console.log(store.getState());

})

store.dispatch(incrementCount({ incrementBy: 5}));

store.dispatch(incrementCount());

store.dispatch(setCount({count: 10}));

store.dispatch(resetCount());

store.dispatch(decrementCount({decrementBy: 1}));
 