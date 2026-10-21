let transactions = [];

function showSection(sectionId){
    document.getElementById('dashboard').style.display= "none";
    document.getElementById('add-transactions').style.display= "none";
    document.getElementById('recent-transactions').style.display= "none";

    document.getElementById(sectionId).style.display = "block";
}

function addtransaction(event){
    event.preventDefault();

    let title = document.getElementById("title").value;
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    transactions.push({title: title, amount: amount,type:type });
    document.getElementById('title').value = '';
    document.getElementById('amount').value = '';

    updateDashboard();
    renderTransactions();
    showSection('dashboard');
}

function updateDashboard(){
     let totalIncome = 0;
    let totalExpense = 0;

    for(let i = 0; i < transactions.length;i++){
        if(transactions[i].type === "income") {
            totalIncome += transactions[i].amount;
        } 
        else {
            totalExpense += transactions[i].amount;
        }
    }
    let totalBalance = totalIncome - totalExpense;
    document.getElementById('total-balance').innerText = "₹" + totalBalance;
    document.getElementById('total-income').innerText = "₹" + totalIncome;
    document.getElementById('total-expense').innerText = "₹" + totalExpense;
}
function renderTransactions() {
    let listContainer = document.getElementById('transaction-list');
    listContainer.innerHTML = ''; 

    for (let i = 0; i < transactions.length; i++) {
        let t = transactions[i];

        let li = document.createElement('li');
        li.innerHTML = t.title + " - ₹" + t.amount + ' <button onclick="deleteTransaction(${i})">Delete</button>';

        listContainer.appendChild(li);
    }
}
function deleteTransaction(index) {
    transactions.splice(index, 1); 
    updateDashboard();             
    renderTransactions();          
}
showSection('dashboard');
updateDashboard();
