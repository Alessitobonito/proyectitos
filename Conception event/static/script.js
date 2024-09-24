// static/script.js
document.getElementById('birthdate-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const birthdate = new Date(document.getElementById('birthdate').value);
    const conceptionDate = new Date(birthdate);
    conceptionDate.setDate(conceptionDate.getDate() - 266); // Aproximadamente 38 semanas

    const startDate = new Date(conceptionDate);
    startDate.setDate(startDate.getDate() - 4);
    const endDate = new Date(conceptionDate);
    endDate.setDate(endDate.getDate() + 4);

    fetch('/get-events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            start_date: startDate.toISOString().split('T')[0],
            end_date: endDate.toISOString().split('T')[0]
        })
    })
    .then(response => response.json())
    .then(data => displayEvents(data, conceptionDate))
    .catch(error => {
        console.error('Error fetching events:', error);
    });
});

function displayEvents(eventsArray, conceptionDate) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>Fecha de Concepción Estimada: ${conceptionDate.toDateString()}</h2>`;
    const eventsList = document.createElement('ul');

    eventsArray.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = `${event.year} - ${event.text}`;
        eventsList.appendChild(listItem);
    });

    resultDiv.appendChild(eventsList);
}
