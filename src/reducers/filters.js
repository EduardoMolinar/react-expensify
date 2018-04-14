import moment from 'moment';

//Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default (state = filtersReducerDefaultState, action) => {

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