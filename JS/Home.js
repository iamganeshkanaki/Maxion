const id = localStorage.getItem('id');
const fname = localStorage.getItem('fname');
const lname = localStorage.getItem('lname');
const email = localStorage.getItem('email');
console.log(`${id}`)
console.log(`${fname}`)
console.log(`${lname}`)
console.log(`${email}`)
document.getElementById("auname").innerHTML = fname;

document.getElementById("logout").addEventListener("submit", function (event) {
    event.preventDefault();
    fetch("http://127.0.0.1:12345/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {        
        if (res.status === 201) {
            localStorage.clear();
            window.location.href = "../../login1.html";
        }else{
            throw new Error("Something went wrong");
        }
    })
})