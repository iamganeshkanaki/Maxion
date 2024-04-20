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
    fetch("http://127.0.0.1:12345/demo", {
        method: "POST",                
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
        body: JSON.stringify(formDataObject) // Convert form data object to JSON
    }).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log("Error:",err);
    })            
});