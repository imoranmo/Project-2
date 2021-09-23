const commentToggleBtn = document.querySelector('#toggle-comments')
const inputComment = document.querySelector('#comment')
const commentBlock = commentToggleBtn.nextElementSibling;

// The custom helper 'format_date' takes in a timestamp
const format_date = (date) => {
  // Using JavaScript Date methods, we get and format the month, date, and year
  // We need to add one to the month since it is returned as a zero-based value
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear() } at ${new Date(date).toLocaleTimeString()}`;}

const commentToggleHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
      event.preventDefault();
      const post_id = event.target.value;

      loadComments(post_id);


      
      commentBlock.classList.toggle("hidden");
      if (commentBlock.classList.contains("hidden")) {
        commentToggleBtn.innerHTML = "Show Comments"
      } else {
        commentToggleBtn.innerHTML = "Hide Comments"
      }
  
    };

    const loadComments = async (post_id) => {
      // Gather the data from the form elements on the page
      try{
          
          const url = '/api/posts/comments/' + post_id
          // Send the e-mail and password to the server
          const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })

        const commentArr = await response.json()
          console.log(commentArr);
        

          commentBlock.innerHTML = '';

            for (i=0; i < commentArr.length; i++){

              const {user_name} = commentArr[i].user;
              const {content, date_created} = commentArr[i]
              let commentEl = document.createElement("div");
              let commentUser = document.createElement("h3");
              let commentP = document.createElement("p");
              //  const newTime = format_time(date_created);
              const newDate = format_date(date_created);
              

              commentEl.className= 'max-w-4xl px-10 py-4 mx-auto mb-2 bg-gray-200 rounded-lg shadow-md';
              commentUser.innerText = `${user_name} on ${newDate}`
              commentUser.className = 'italic text-grey-200 text-sm'
              commentP.className = 'font-semibold'
              commentP.innerText = content
              commentEl.append(commentUser, commentP);
              commentBlock.append(commentEl);
            }
          } catch (err) {
            console.log(err)
          }
    }

    const postComment = async (event) => {
          
      const post_id = commentToggleBtn.value;
      const url = '/api/posts/addComment/' + post_id
      const date_created = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const content = event.target.value

      const newComment = {content, date_created};

      if (content && date_created) {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        event.target.value = ""
        loadComments(post_id)
      } else {
        alert('Failed to post comment');
      }
    }
  }

    commentToggleBtn.addEventListener('click', commentToggleHandler);

    inputComment.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
          postComment(event)
      }
  });


