async function finduser(event) {
  event.preventDefault();

  const id = document.getElementById('user-id-input').value;
  const resp = await fetch('localhost:8080/users/' + id);
  const user = await resp.json();

  const pokemonNameElement = document.getElementById('user-name');
  pokemonNameElement.innerText = user.firstname;
}

function populateEmployees(users) {

  const employeeElements = users.map(users => {
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
    cardUsername.innerText = users.userid;
    cardBody.appendChild(cardUsername);


    const cardData = document.createElement('ul');
    cardData.classList = 'list-group list-group-flush';
    card.appendChild(cardData);

    const firstName = document.createElement('li');
    firstName.classList = 'list-group-item';
    firstName.innerText = 'Firstname: ' + users.firstname;
    cardData.appendChild(firstName);

    const lastName = document.createElement('li');
    lastName.classList = 'list-group-item';
    lastName.innerText = 'Lastname: ' + users.lastname;
    cardData.appendChild(lastName);

    const email = document.createElement('li');
    email.classList = 'list-group-item';
    email.innerText = 'Description: ' + users.email;
    cardData.appendChild(email);

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

  const employeeContainer = document.getElementById('employee-container');
  employeeContainer.append(...employeeElements);

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