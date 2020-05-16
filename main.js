const totalBalance = document.querySelector('.total__balance'),
      totalIncome = document.querySelector('.total__money-income'),
      totalExpenses = document.querySelector('.total__money-expenses'),
      histroyList = document.querySelector('.history__list'),
      form = document.querySelector('#form'),
      opName = document.querySelector('.operation__name'),
      opAmount = document.querySelector('.operation__amount'),

generateId = () => Math.round(Math.random() * 1e8).toString();

dbOperation = [
   {
      id: 1,
      operationName: 'Sold a bike',
      amount: 3000
   },
   {
      id: 2,
      operationName: 'Got a salary',
      amount: 5000
   },
   {
      id: 3,
      operationName: 'Bought a book',
      amount: -5000
   }
];

const addListItem = (operation) => {
   const listItem = document.createElement('li');
   listItem.classList.add('history__item');
   className = operation.amount > 1 ? 'history__item-plus' : 'history__item-minus';
   listItem.classList.add(className);
   listItem.innerHTML = `
   ${operation.operationName}
   <span class="history__money">${operation.amount} $</span>
   <button class="history_delete" data-id="${operation.id}">x</button>
   `
   histroyList.append(listItem);
};


updateBalance = () => {
   const resultIncome = dbOperation
   .filter((item) => item.amount > 1)
   .reduce((result, item) => result + item.amount, 0);

   const resultExpenses = dbOperation
   .filter((item) => item.amount < 1)
   .reduce((result, item) => result + item.amount, 0)

   totalIncome.textContent = resultIncome;
   totalExpenses.textContent = resultExpenses;
   totalBalance.textContent = (resultIncome + resultExpenses) + ' $';

};


addOperation = (event) => {   
   event.preventDefault();
   operName = opName.value;
   operAmount = +opAmount.value;
   if (operName != '' && operAmount != '') {      
      newOperation = {
         id: generateId(),
         operationName: operName,
         amount: operAmount
      };
      dbOperation.push(newOperation);
      opName.value = '';
      opAmount.value = '';
      init();
   }
   else {
      opName.style.borderColor = 'red';  
      opAmount.style.borderColor = 'red';  
   } 
};



deleteOperation = (event) => {
   if(event.target.classList.contains('history_delete')) {
      dbOperation = dbOperation.filter(item => item.id != event.target.dataset.id);
      init();
   };
};


form.addEventListener('submit', addOperation);
histroyList.addEventListener('click', deleteOperation);


init = () => {
   histroyList.textContent = '';
   dbOperation.forEach(addListItem);
   updateBalance();
};

init();





