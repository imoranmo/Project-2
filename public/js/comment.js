const commentToggleHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  try {
      // Gather the data from the form elements on the page
      const post_id = event.target.value;
      const url = '/api/posts/comments/' + post_id
      // Send the e-mail and password to the server
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

     const commentArr = await response.json()
     console.log(commentArr[0]);
  } catch {

  }
    };

document
  .querySelector('#toggle-comments')
  .addEventListener('click', commentToggleHandler);
