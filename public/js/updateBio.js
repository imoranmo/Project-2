const updateBio = document.querySelector('#updateBio')

const updateBioHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    
    // Gather the data from the form elements on the page
    const rhythm_id = parseInt(document.querySelector('#rhythm').value);
    // Content comes in as a styles paragraph element
    const content = CKEDITOR.instances.content.getData();
    const date_updated = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const url = document.querySelector("#url").value
    const updatePost = {title, rhythm_id, content, date_updated, url} 
    const post_id = updateForm.getAttribute('data-value')

      console.log(updatePost);

      if (title && rhythm_id && content) {
        // Send the e-mail and password to the server
        const response = await fetch(`/api/posts/updatePost/${post_id}`, {
          method: 'PUT',
          body: JSON.stringify(updatePost),
          headers: { 'Content-Type': 'application/json' },
        });
        
        console.log("MADE IT")
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to post');
        }
      } else {
      alert('Must fill out all fields');
        }
  };
  
updateForm.addEventListener('submit', updatePostFormHandler);
  