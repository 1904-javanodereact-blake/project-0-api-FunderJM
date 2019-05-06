async function findreimbursement(event) {
  event.preventDefault();
  const id = document.getElementById('reimbursement-id-input').value;
  const currentreimbursementString = localStorage.getItem('currentreimbursement');
  const currentreimbursement = JSON.parse(currentreimbursementString);

  const response = await fetch('http://localhost:8080/reimbursements/status/' + id, {
    credentials: 'include'
  });
  if (response.status === 200) {
    const reimbursements = await response.json();
    populateReimbursements(reimbursements);
  }
}

function populateReimbursements(reimburse) {

  const ReimbursementElements = reimburse.map(reimburse => {
    const card = document.createElement('div');
    
    card.classList = 'card col-md-4 col-sm-6 col-xs-12';

    const img = document.createElement('img');
    img.src = 'https://thenewswheel.com/wp-content/uploads/2018/05/Millennium-Falcon-760x428.jpg';
    img.classList = 'img-fluid'
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.classList = 'card-body';
    card.appendChild(cardBody);

    const cardTitle = document.createElement('h5');
    cardTitle.classList = 'card-title';
    cardTitle.innerText = reimburse.reimbursementid;
    cardBody.appendChild(cardTitle);


    const cardData = document.createElement('ul');
    cardData.classList = 'list-group list-group-flush';
    card.appendChild(cardData);

    const amount = document.createElement('li');
    amount.classList = 'list-group-item';
    amount.innerText = 'Amount: ' + reimburse.amount;
    cardData.appendChild(amount);

    const dateSubmitted = document.createElement('li');
    dateSubmitted.classList = 'list-group-item';
    dateSubmitted.innerText = 'Date Submitted: ' + reimburse.dateSubmitted;
    cardData.appendChild(dateSubmitted);

    const description = document.createElement('li');
    description.classList = 'list-group-item';
    description.innerText = 'Description: ' + reimburse.description;
    cardData.appendChild(description);

    // const deleteItem = document.createElement('li');
    // deleteItem.classList = 'list-group-item';
    // const deleteButton = document.createElement('button');
    // deleteButton.classList = 'btn btn-dark';
    // deleteButton.addEventListener('click', () => deleteShip(ship.shipId, card));
    // deleteButton.innerText = 'Delete';
    // deleteItem.appendChild(deleteButton);
    // cardData.appendChild(deleteItem);
    
    return card;
  });
    

  const reimbursementIdContainer = document.getElementById('reimbursement-container');
  reimbursementIdContainer.innerHTML = '';
  reimbursementIdContainer.append(...ReimbursementElements);

  // <div class="card col-md-4 col-sm-6 col-xs-12">
  //   <img src="https://thenewswheel.com/wp-content/uploads/2018/05/Millennium-Falcon-760x428.jpg" class="card-img-top"
  //     alt="...">
  //     <div class="card-body">
  //       <h5 class="card-title">Ship Name</h5>
  //     </div>
  //     <ul class="list-group list-group-flush">
  //       <li class="list-group-item">Speed: 32412</li>
  //       <li class="list-group-item">Weight: 3124312</li>
  //       <li class="list-group-item">Description: dlsa;jf;asdlkfjsda lksdalkfjsdlkfj</li>
  //       <li class="list-group-item">
  //         <button class="btn btn-danger">Delete</button>
  //       </li>
  //     </ul>
  //     </div>
}

findreimbursement();