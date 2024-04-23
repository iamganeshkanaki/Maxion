document.getElementById("newPass").addEventListener('submit', function (event) {
    event.preventDefault();
    let form = new FormData(this);
    let formDataObject = {};
    for (let pair of form.entries()) {
        formDataObject[pair[0]] = pair[1];
    }

    fetch("http://127.0.0.1:12345/newPassword", {
        method: "POST",
        body: JSON.stringify(formDataObject),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        console.log(`Done Code Works Successfully ${res.json()}`);
    }).catch((err) => {
        console.log(`you got Error: ${err}`);
    });
});