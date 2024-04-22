document.getElementById("forgot").addEventListener('click', function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    

    console.log("Error:",formData);
    // Client-side code (running in the browser)
    fetch('http://127.0.0.1:12345/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: formDataObject.email,
            subject: 'Test Email',
            text: 'This is a test email sent from JavaScript',
        }),
    })
        .then(response => {
            if (response.ok) {
                console.log('Email sent successfully');
            } else {
                console.error('Error sending email');
            }
        })
        .catch(error => {
            console.error('Error sending email:', error);
        });
})