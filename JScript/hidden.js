let contnetBox = document.getElementById("contnetBox");
let body = document.body;

window.onload = loadPage()

function loadPage() {
    console.log("hello");
    
    fetch(`../JSON/hidden.json`)
        .then(res => res.json())
        .then(data => imageAdder(data))
}

function imageAdder(data) {
    let htmlTag = '';
    let count = 0;

    data.forEach(cotation => {
        count += 1;
        htmlTag += `<section class="boxes"><p>${cotation}</p></section>`;
    });

    contnetBox.innerHTML = htmlTag;

    if (count < 7) {
        body.style.height = "calc(100vh - 80px)";
    } else {
        body.style.height = "100%";
    }
}