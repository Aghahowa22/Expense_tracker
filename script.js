document.getElementById("add-expense").addEventListener("click", addExpense);
document.getElementById("filter-date").addEventListener("input", filterExpenses);

function addExpense() {
  const name = document.getElementById("expense-name").value;
  const amount = document.getElementById("expense-amount").value;
  const date = document.getElementById("expense-date").value;

  if (name === "" || amount === "" || date === "") {
    alert("Please fill in all fields");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount: parseFloat(amount).toFixed(2),
    date,
  };

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  displayTotal();
}

function displayExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const expensesList = document.getElementById("expenses");
  expensesList.innerHTML = "";

  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="expense-name">${expense.name}</span>
            <span class="expense-amount">$${expense.amount}</span>
            <span class="expense-date">${expense.date}</span>
            <button class="cancel-button" onclick="removeExpense(${expense.id})">Cancel</button>
        `;
    expensesList.appendChild(li);
  });
}

function removeExpense(id) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  displayTotal();
}

function displayTotal() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const expensesTotal = document.getElementById("total-expense");
  expensesTotal.innerHTML = "";

  const totalAmount = expenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount),
    0
  );
  const li = document.createElement("li");
  li.innerHTML = `
        <span>Total:</span>
        <span class="expense-amount">$${totalAmount.toFixed(2)}</span>
        <span class="expense-date"></span>
    `;
  expensesTotal.appendChild(li);
}

function filterExpenses() {
  const filterDate = document.getElementById("filter-date").value;
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const filteredExpenses = expenses.filter(
    (expense) => expense.date === filterDate
  );
  const expensesList = document.getElementById("expenses");
  expensesList.innerHTML = "";

  filteredExpenses.forEach((expense) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="expense-name">${expense.name}</span>
            <span class="expense-amount">$${expense.amount}</span>
            <span class="expense-date">${expense.date}</span>
            <button class="cancel-button" onclick="removeExpense(${expense.id})">Cancel</button>
        `;
    expensesList.appendChild(li);
  });
}

window.onload = () => {
  displayExpenses();
  displayTotal();
};
