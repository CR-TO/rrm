let options = {
    orientation: 'p',
    unit: 'mm',
};

let cene = [];
let izdelki = [];
let lock = false;
let doc = new jsPDF(options);

document.getElementsByClassName('datum')[0].value = new Date(Date.now()).getDate() + "." + new Date(Date.now()).getMonth() + 1 + "." + new Date(Date.now()).getFullYear();

let getData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/st');
    xhr.onload = function () {
        document.getElementsByClassName('metadata')[0].innerHTML = parseInt(xhr.response) + 1;
    };
    xhr.send();
}

function popusti() {

    for (let i = 5; i < 100; i += 5) {
        let element = document.createElement('option');

        element.value = "" + i;

        element.appendChild(document.createTextNode("" + i));

        document.getElementById('popusti').appendChild(element);
    }
}

function enote() {
    for (let i = 1; i <= 2; i++) {
        let element = document.createElement('option');

        element.value = "" + (0.75 * i) + "l";

        element.appendChild(document.createTextNode("" + (0.75 * i) + "l"));

        document.getElementById('enote').appendChild(element);
    }
}

function getImgFromUrl(logo_url, callback) {
    var img = new Image();
    img.src = logo_url;
    img.onload = function () {
        callback(img);
    };
}

fetch('/vina.json').then(res => res.json()).then((res) => {
    for (let vino of res.vina) {
        dodaj_naziv(vino.ime, vino.cena)
    }

});


document.getElementsByClassName('metadata')[0].innerHTML = "-1";
getData();
popusti();
enote();