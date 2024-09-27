document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const birthdate = document.getElementById('birthdate').value;

    fetch('/get-events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ start_date: birthdate, end_date: birthdate })
    })
    .then(response => response.json())
    .then(data => {
        const results = document.getElementById('results');
        results.innerHTML = '';

        if (data.length === 0) {
            results.innerHTML = 'No events found.';
        } else {
            data.forEach(event => {
                const div = document.createElement('div');
                div.textContent = `${event.date}: ${event.event}`;
                results.appendChild(div);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching events:', error);
        document.getElementById('results').innerHTML = 'Error fetching events.';
    });
});
