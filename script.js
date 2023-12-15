// Updated JavaScript
const addExpenseBtn = document.querySelector(".add-expense-btn");
const addIncomeBtn = document.querySelector(".add-income-btn");
const incomeInput = document.getElementById("income");
const incomeInputSection = document.getElementById("incomeInputSection");
const expenseList = document.querySelector(".expense-list");
const totalIncome = document.querySelector(".total-income h3");
const totalExpenses = document.querySelector(".total-expenses h3");
const remainingAmount = document.querySelector(".remaining-amount h3");

let expenses = [];
let total = 0;
let income = 0;

function renderExpenses() {
    let html = `
        <div class="expense-item">
            <div class="expense-item-description heading">Description</div>
            <div class="expense-item-amount heading">Amount</div>
            <button class="heading-action">Action</button>
        </div>`;

    expenses.forEach((expense) => {
        html += `
            <div class="expense-item">
                <div class="expense-item-description item-text">${expense.description}</div>
                <div class="expense-item-amount item-text">$${expense.amount}</div>
                <button class="delete-expense-btn item-text" onclick="deleteExpense(${expenses.indexOf(expense)})">&times;</button>
            </div>
        `;
    });

    expenseList.innerHTML = html;
    totalExpenses.innerText = `Total Expenses: $${total}`;
    remainingAmount.innerText = `Remaining: $${income - total}`;
}


function addExpense() {
    if (income === 0) {
        alert("Please add income first before adding expenses.");
        return;
    }

    const description = prompt("Enter Expense Description:");
    const amount = parseFloat(prompt("Enter Expense Amount"));

    if (description && amount) {
        const expense = {
            description: description,
            amount: amount,
        };

        expenses.push(expense);
        total += amount;
        renderExpenses();
    }
}


function deleteExpense(index) {
    total -= expenses[index].amount;
    expenses.splice(index, 1);
    renderExpenses();
}

function addIncome() {
    const incomeValue = parseFloat(incomeInput.value);
    if (!isNaN(incomeValue)) {
        income = incomeValue;
        totalIncome.innerText = `Total Income: $${income}`;
        remainingAmount.innerText = `Remaining: $${income - total}`;
        incomeInput.value = "";
        incomeInputSection.style.display = "none"; // Hide income input section
    } else {
        alert("Please enter a valid income amount.");
    }
}


addExpenseBtn.addEventListener("click", addExpense);
addIncomeBtn.addEventListener("click", addIncome);

expenseList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-expense-btn")) {
        const index = Array.from(event.target.parentNode.parentNode.children).indexOf(
            event.target.parentNode
        );
        deleteExpense(index);
    }
});

// Show income input section only on the first load
window.onload = function () {
    incomeInputSection.style.display = "block";
};
