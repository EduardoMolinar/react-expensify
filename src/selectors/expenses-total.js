export default (expensesList) => {

  let total = 0;

  if (expensesList && expensesList.length > 0) {
    total = (expensesList.map((expense) => expense.amount)
    .reduce((acumulator, currentValue) => acumulator + currentValue));
  } 

  return total;
};