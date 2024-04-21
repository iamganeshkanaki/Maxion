document.getElementById("forgot").addEventListener('click', function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    let formDataObject = {};
    for (var pair of formData.entries()) {
        formDataObject[pair[0]] = pair[1];
    }
    Email.send({
        Host: "smtp.gmail.com",
        Username: "maxiosgn@gmail.com",
        Password: "dage bycm smcj bmzq",
        To: formDataObject.email,
        From: "maxiosgn@gmail.com",
        Subject: "Sending Email using javascript",
        Body: "Well that was easy!!",
    })
        .then(function (message) {
            alert("mail sent successfully");
            console.log(message);
        });
    window.location.href = "../newPassword.html";
})