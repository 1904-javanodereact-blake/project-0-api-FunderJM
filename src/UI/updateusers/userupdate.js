async function findUser(event) {
  event.preventDefault();
  const id = document.getElementById('user-id-input').value;
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);

  const response = await fetch('http://localhost:8080/users/' + id, {
    credentials: 'include'
  });
  if (response.status === 200) {
    const thisUser = await response.json();
    populateEmployee(thisUser);
  }
}

function populateEmployee(user) {

    const card = document.createElement('div');
    
    card.classList = 'card col-md-4 col-sm-6 col-xs-12';

    const img = document.createElement('img');
    img.src = 'https://thenewswheel.com/wp-content/uploads/2018/05/Millennium-Falcon-760x428.jpg';
    img.classList = 'img-fluid'
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.classList = 'card-body';
    card.appendChild(cardBody);

    const cardUsername = document.createElement('h5');
    cardUsername.classList = 'card-username';
    cardUsername.innerText = user.userid;
    cardBody.appendChild(cardUsername);


    const cardData = document.createElement('ul');
    cardData.classList = 'list-group list-group-flush';
    card.appendChild(cardData);

    const firstName = document.createElement('li');
    firstName.classList = 'list-group-item';
    firstName.innerText = 'Firstname: ' + user.firstname;
    cardData.appendChild(firstName);

    const lastName = document.createElement('li');
    lastName.classList = 'list-group-item';
    lastName.innerText = 'Lastname: ' + user.lastname;
    cardData.appendChild(lastName);

    const email = document.createElement('li');
    email.classList = 'list-group-item';
    email.innerText = 'Description: ' + user.email;
    cardData.appendChild(email);

    const updateItem = document.createElement('li');
    updateItem.classList = 'list-group-item';
    const updateButton = document.createElement('button');
    updateButton.classList = 'btn btn-dark';
    updateButton.addEventListener('click', () => updateShip(ship.shipId, card));
    updateButton.innerText = 'Update';
    updateItem.appendChild(updateButton);
    cardData.appendChild(updateItem);
    

  const employeeContainer = document.getElementById('employee-container');
  employeeContainer.innerHTML = '';
  employeeContainer.append(card);

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

findUser();