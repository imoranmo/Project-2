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
      console.log(commentArr);
      const commentBlock = document.getElementById("comments");
      commentBlock.innerHTML = '<h3>Comments:</h3>';

      if (commentBlock.classList.contains('hidden')) {
        for (i=0; i < commentArr.length; i++){
   
           const {user_name} = commentArr[i].user;
           const {content, date_created} = commentArr[i]
           let commentEl = document.createElement("div");
           let commentUser = document.createElement("h3");
           let commentP = document.createElement("p");
   
           commentUser.innerText = `By: ${user_name} at ${date_created}`
           commentP.innerText = content
           commentEl.append(commentUser, commentP);
           commentBlock.append(commentEl);
        }
      }

      commentBlock.classList.toggle("hidden");
  } catch {

  }
    };

document
  .querySelector('#toggle-comments')
  .addEventListener('click', commentToggleHandler);
