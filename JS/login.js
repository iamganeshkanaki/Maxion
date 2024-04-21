document.getElementById("register").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission    

    // Get the form data
    var formData = new FormData(this);
    console.log(formData);
    // Create an object to hold form data
    var formDataObject = {};
    for (var pair of formData.entries()) {
        formDataObject[pair[0]] = pair[1];
    }

    console.log("Form Data:", formDataObject);

    // Send the form data to the backend
    fetch("http://127.0.0.1:12345/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(formDataObject) // Convert form data object to JSON
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log("Error:", err);
    })
});

document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission        

    // Get the form data
    var formData = new FormData(this);

    // Create an object to hold form data
    var formDataObject = {};
    for (var pair of formData.entries()) {
        formDataObject[pair[0]] = pair[1];
    }
    let stus;
    fetch("http://127.0.0.1:12345/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
    })
        .then((res) => {
            stus = res.status;
            return res.json();
        })
        .then((data) => {
            if (stus === 201) {
                console.log(data.msg.id);
                localStorage.setItem('id', data.msg.id);
                localStorage.setItem('fname', data.msg.fname);
                localStorage.setItem('lname', data.msg.lname);
                localStorage.setItem('email', data.msg.email);
                window.location.href = '../LoginIn/Home/home.html';
            } else {
                console.log(data.msg);
            }
        })
        .catch((err) => {
            console.error('Error:', err);
        });
});
