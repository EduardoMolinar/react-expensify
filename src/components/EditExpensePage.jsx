import React from 'react';
import {connect} from 'react-redux';
import {startRemoveExpense, editExpense} from '../actions/expenses';
import ExpenseForm from './ExpenseForm.jsx';

export class EditExpensePage extends React.Component {

  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  onClick = () => {
    this.props.startRemoveExpense(this.props.expense.id);
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
  startRemoveExpense: (paramsId) => dispatch(startRemoveExpense(paramsId))
});


const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => (expense.id === props.match.params.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);