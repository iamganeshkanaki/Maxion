document.getElementById('forgot').addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    let formDataObject = {};
    let formData = new FormData(this);
    for (let pair of formData.entries()) {
        formDataObject[pair[0]] = pair[1];

    }

    console.log(formDataObject);
    // Client-side code (running in the browser)
    fetch('http://127.0.0.1:12345/sendmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject)
    })
        .then(response => {
            if (response.ok) {
                console.log('Email sent successfully');
                alert('Email sent successfully');
            } else {
                console.error('Error sending email');
            }
        })
        .catch(error => {
            console.error('Error sending email:', error);
        });
})