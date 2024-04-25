document.getElementById("addemp").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(this);

    // Create an object to hold form data
    var formDataObject = {};
    for (var pair of formData.entries()) {
        formDataObject[pair[0]] = pair[1];
    }
    console.log(formDataObject);
    fetch("http://127.0.0.1:12345/addemp", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(formDataObject) // Convert form data object to JSON
    }).then((res) => {
        alert("Employee add Sucessfully.")
    }).catch((err) => {
        console.log("Error:", err);
    })
})