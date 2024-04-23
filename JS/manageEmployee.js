/* buit in code made by girls */
function searchEmployee() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        tdName = tr[i].getElementsByTagName("td")[2]; // Employee Name column
        tdTktNo = tr[i].getElementsByTagName("td")[1]; // TKT.NO column
        if (tdName && tdTktNo) {
            txtValueName = tdName.textContent || tdName.innerText;
            txtValueTktNo = tdTktNo.textContent || tdTktNo.innerText;
            if (txtValueName.toUpperCase().indexOf(filter) > -1 || txtValueTktNo.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

// above line code made by girls and I don't know this code.
const onPageLoad = async () => {
    fetch("http://127.0.0.1:12345/employeeData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((users => users.json())).then((data) => {
        let tktNo = 121;
        data.msg.forEach((item, index) => {
            const tableBody = document.getElementById("tableBody");

            const row = document.createElement("tr");

            const serialCell = document.createElement("td");
            serialCell.textContent = index + 1;
            row.appendChild(serialCell);

            const ticketCell = document.createElement("td");
            ticketCell.textContent = tktNo; // Assuming you want to increment tktNo with each row
            row.appendChild(ticketCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = item.fname + " " + item.lname;
            row.appendChild(nameCell);

            const roleCell = document.createElement("td");
            roleCell.textContent = item.role;
            row.appendChild(roleCell);

            const actionCell = document.createElement("td");

            const profileButton = document.createElement("button");
            profileButton.className = "btn1";
            const profileLink = document.createElement("a");
            profileLink.href = "profile.html";
            profileLink.textContent = "Profile";
            profileButton.appendChild(profileLink);

            profileButton.addEventListener("click", () => {
                let formId = item._id;
                console.log(`formId ${formId}`);
                // Fetch details of the corresponding employee when the profile button is clicked
                fetch("http://127.0.0.1:12345/oneEmplo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        formId
                    })
                }).then((res) => res.json()).then((data) => {
                    console.log(data.msg);
                    console.log(data.msg.email);
                }).catch((err) => {
                    console.log(err);
                })
                console.log(item._id);

            });

            actionCell.appendChild(profileButton);
            const deleteButton = document.createElement("button");
            deleteButton.className = "btn2";
            deleteButton.textContent = "Delete";
            actionCell.appendChild(deleteButton);


            row.appendChild(actionCell);

            tableBody.appendChild(row);
            tktNo += 1;
        })
    })
}
document.addEventListener("DOMContentLoaded", function () {
    onPageLoad();
})