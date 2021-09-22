// Listener for submit filter button
// Save checkbox state to local storage
// function add query to url and refreshes page

const updateResultsBtnHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const rhythmFilters = document.querySelectorAll('input[type=checkbox]:checked');
    const checkedRhythmFilters = [...rhythmFilters]

    const rhythmIdArr = checkedRhythmFilters.map((ele) => {
        let rhythmId;
        if (ele.checked) {
            rhythmId = parseInt(ele.getAttribute('data-value'));
        } else {
            rhythmId = 0;
        }
        return rhythmId;
    })

    // const checkedRhythmIdArr = rhythmIdArr.filter((ele) => !ele == 0 );

      if (rhythmIdArr) {
        // Send the e-mail and password to the server
        const urlQuery = '?rhythms=' + rhythmIdArr.join(",");
          document.location.replace(urlQuery);
      }

  };
  
  document
    .querySelector('#updResults')
    .addEventListener('click', updateResultsBtnHandler);
  