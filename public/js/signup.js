const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confPassword = document.querySelector('#confpassword-signup').value.trim();
  const user_name = document.querySelector('#username-signup').value.trim();
  const first_name = document.querySelector('#firstname-signup').value.trim();
  const last_name = document.querySelector('#lastname-signup').value.trim();

  if (password == confPassword){
    if (email && password) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, user_name, first_name, last_name }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to signup');
      }
    }
  } else{
    alert('Password need to match!');
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
