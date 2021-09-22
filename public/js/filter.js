// Listener for submit filter button
// Save checkbox state to local storage
// function add query to url and refreshes page

window.onload = function () {
        // Gather the data from the form elements on the page
        const rhythmFilters = document.querySelectorAll('input[type=checkbox]');
    
        const rhythmFiltersArr = [...rhythmFilters]
        const numFilter = rhythmFiltersArr.length

        for (i=0; i< numFilter; i++) {
            const id = rhythmFiltersArr[i].getAttribute('data-value');
            const val = localStorage.getItem('rhythm' + id)
            if (val) {
                const filtEl = document.querySelector(`#rhythmFilter[data-value='${id}']`)
                if (val == 'true') {
                filtEl.checked = true;
                } else {
                    filtEl.checked = false;
                }
                console.log(filtEl.checked)
            }
        }
}


const updateResultsBtnHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const rhythmFilters = document.querySelectorAll('input[type=checkbox]');
    
    const rhythmFiltersArr = [...rhythmFilters]

    const rhythmIdArr = rhythmFiltersArr.map((ele) => {
        let rhythmId;
        if (ele.checked) {
            rhythmId = parseInt(ele.getAttribute('data-value'));
            localStorage.setItem('rhythm' + rhythmId, true);
        } else {
            rhythmId = parseInt(ele.getAttribute('data-value'));
            localStorage.setItem('rhythm' + rhythmId, false);
            rhythmId = 0
        }
        return rhythmId;
    })

    const checkedRhythmIdArr = rhythmIdArr.filter((ele) => !ele == 0 );

      if (checkedRhythmIdArr) {
        // Send the e-mail and password to the server
        const urlQuery = '?rhythms=' + checkedRhythmIdArr.join(",");
          document.location.replace(urlQuery);
      }

  };
  
  document
    .querySelector('#updResults')
    .addEventListener('click', updateResultsBtnHandler);
  