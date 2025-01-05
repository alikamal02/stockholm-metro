fetch('/api/stations')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Debugging
        // Populate station data into the UI
    })
    .catch(error => console.error('Error fetching stations:', error));