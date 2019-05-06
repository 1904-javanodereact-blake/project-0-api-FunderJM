async function createReimbursement() {
    event.preventDefault();
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const amount = document.getElementById('amount').value;
    const today = new Date();
    const thisdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate;
    const description = document.getElementById('Description').value;
    const status = 1;
    const type = document.getElementById("Types");
    const reType = type.options[type.selectedIndex].value;

    console.log(currentUser);
    console.log(amount);
    console.log(today);
    console.log(description);
    console.log(reType);

    const request = {currentUser, amount, thisdate, description, status, reType};

  
    const response = await fetch('http://localhost:8080/reimbursements', {
      method: 'POST',
      credentials: 'include',
      headers: {
          'content - type': 'application/json'
      },
      body: JSON.stringify(request)
    });
}
