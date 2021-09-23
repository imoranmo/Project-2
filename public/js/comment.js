const commentToggleBtn = document.querySelector('#toggle-comments')

const format_time =  (date) => {
  return date.toLocaleTimeString();
}

// The custom helper 'format_date' takes in a timestamp
const format_date = (date) => {
  // Using JavaScript Date methods, we get and format the month, date, and year
  // We need to add one to the month since it is returned as a zero-based value
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
    // We add five years to the 'year' value to calculate the end date
    new Date(date).getFullYear()
  }`;}

const commentToggleHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  try {
    
      // Gather the data from the form elements on the page
      const post_id = event.target.value;
      const commentBlock = commentToggleBtn.nextElementSibling;
      const url = '/api/posts/comments/' + post_id
      // Send the e-mail and password to the server
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

     const commentArr = await response.json()
      console.log(commentArr);
      
      commentBlock.innerHTML = '<h3>Comments:</h3>';

      if (commentBlock.classList.contains('hidden')) {
        for (i=0; i < commentArr.length; i++){
   
           const {user_name} = commentArr[i].user;
           const {content, date_created} = commentArr[i]
           let commentEl = document.createElement("div");
           let commentUser = document.createElement("h3");
           let commentP = document.createElement("p");
            const newDate = format_date(date_created) //+ " " + format_time(date_created)
           commentUser.innerText = `By: ${user_name} on ${newDate}`
           commentP.innerText = content
           commentEl.append(commentUser, commentP);
           commentBlock.append(commentEl);
        }
      }

      commentBlock.classList.toggle("hidden");
      if (commentBlock.classList.contains("hidden")) {
        commentToggleBtn.innerHTML = "Show Comments"
      } else {
        commentToggleBtn.innerHTML = "Hide Comments"
      }
      
  } catch {

  }
    };


    commentToggleBtn.addEventListener('click', commentToggleHandler);
