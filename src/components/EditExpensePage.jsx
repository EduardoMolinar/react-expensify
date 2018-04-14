import React from 'react';
import {connect} from 'react-redux';
import {removeExpense, editExpense} from '../actions/expenses';
import ExpenseForm from './ExpenseForm.jsx';

export class EditExpensePage extends React.Component {

  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onClick = () => {
    this.props.removeExpense(this.props.expense.id);
    this.props.history.push('/');
  };

  render() {
    return (
    <div>
      <ExpenseForm
        expense={this.props.expense}
        onSubmit={this.onSubmit}
      />

      <button onClick={this.onClick}>
        Remove Item
      </button>
    </div>
    );
  }
}; 

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (expenseId, expense) => dispatch(editExpense(expenseId, expense)),
  removeExpense: (paramsId) => dispatch(removeExpense(paramsId))
});


const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => (expense.id === props.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);