
const onPageLoad = async () => {
    let name = localStorage.getItem('name');
    let dsgn = localStorage.getItem('dsgn');
    let depart = localStorage.getItem('depart');
    let tkt = localStorage.getItem('tkt');
    let DOJ = localStorage.getItem('DOJ');
    console.log(name, dsgn, depart, tkt, DOJ);
    document.getElementById("ename").innerHTML = name;
    document.getElementById("name").innerHTML = name;
    document.getElementById("tkt").innerHTML = tkt;
    document.getElementById("dsgn").innerHTML = dsgn;
    document.getElementById("dept").innerHTML = depart;
    document.getElementById("DOJ").innerHTML = DOJ;
}

document.getElementById("cancel").addEventListener("click", function () {    
    localStorage.removeItem("name");
    localStorage.removeItem("tkt");
    localStorage.removeItem("dsgn");
    localStorage.removeItem("depart");
    localStorage.removeItem("DOJ");
});


document.getElementById("empData").addEventListener("DOMContentLoaded", function () {
    onPageLoad();
})