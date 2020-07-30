function dodaj_naziv(ime, cena) {

    let element = document.createElement('option');

    element.value = ime;

    element.appendChild(document.createTextNode(ime));

    document.getElementById('nazivi').appendChild(element);

    cene.push([ime, cena]);
}

function izberi() {
    let elm = document.getElementsByClassName('naziv')[0];
    let nazivi = document.getElementById('nazivi');
    let cenaElm = document.getElementsByClassName('cena')[0];

    for (let vino of nazivi.children) {
        if (elm.value == vino.value) {
            for (let cena of cene) {
                if (cena[0] == elm.value) {
                    cenaElm.value = cena[1];
                }
            }
        }
    }

}

function izprazni(flag) {

    let inputs = document.getElementsByTagName("input");
    let elm = document.getElementsByClassName("bodyHolder");

    for (let inp of inputs) {

        if (inp.className == "kraj" || inp.className == "trr" || inp.className == "datum" || inp.className == "naslovnik" || inp.className == "naslov" || inp.className == "posta" || inp.className == "ds") {
            continue;
        }

        if (inp.type != "submit" && inp.className != "popust") {
            inp.value = "";
        }

        if (inp.className == "Enota") {
            inp.value = "0.75l";
        }

        if (inp.className == "kolicina") {
            inp.value = "1";
        }
    }


    if (flag) {
        return;
    }

    izdelki = [];



    let len = elm.length;

    for (let i = 0; i < len; i++) {
        elm[i].remove();
        i = i - 1;
        len = len - 1;
    }
}

function generatePDF(img) {
    doc.addImage(img, 'JPEG', 120, 0, 100, 50);
}


function dodaj_placnika(data) {


    doc.setFont('arial', 'bold');
    doc.setFontSize(15);

    doc.text('Placnik:', 10, 100);

    let x = 10;

    doc.setFontSize(12);
    doc.setFont('arial', 'normal');

    doc.text(data.naslovnik, x, 110);
    doc.text(data.naslov, x, 119);
    doc.setFontSize(10);
    doc.text(data.posta, x, 125);
    doc.setFontSize(12);
    if (data.ds != undefined) {
        doc.text("DŠ:" + data.ds, x, 135);
    }
}

function racun_info(racun) {

    doc.setFont('arial', 'bold');
    doc.setFontSize(15);
    doc.text('Racun: ' + racun.st_rac + "/" + document.getElementsByClassName('datum')[0].value.split('.')[2], 150, 100);
    doc.setFontSize(12);
    doc.setFont('arial', 'normal');
    doc.text("Datum: " + document.getElementsByClassName('datum')[0].value.split('.')[0] + "." + document.getElementsByClassName('datum')[0].value.split('.')[1] + "." + document.getElementsByClassName('datum')[0].value.split('.')[2], 150, 108);
    doc.text("Kraj: " + racun.kraj, 150, 113);
    doc.text("Datum opravljene sotritve: \n" + racun.dos.getDate() + "." + racun.dos.getMonth() + 1 + "." + racun.dos.getFullYear(), 150, 118);
    doc.text("Rok placila: " + racun.rp, 150, 128);
    doc.text("TRR: " + racun.trr, 150, 133);
}


function dodaj_izdelek() {

    let naziv = document.getElementsByClassName('naziv')[0].value;
    let kolicina = parseInt(document.getElementsByClassName('kolicina')[0].value);
    let enota = document.getElementsByClassName('Enota')[0].value;
    let cena = parseFloat(document.getElementsByClassName('cena')[0].value);
    let vrednost = "" + (cena * kolicina);

    console.log(Number.isNaN(naziv));


    if (naziv != NaN && !Number.isNaN(kolicina) && enota != NaN && !Number.isNaN(cena) && vrednost != NaN) {
        if (naziv != "" && kolicina != "" && enota != "" && cena != "" && vrednost != "") {

            izdelki.push([naziv, kolicina, enota, cena, vrednost]);
            return true;
        }
    }
    return false;
}


function naredi_tabelo() {

    let skupaj = 0;
    let popust = document.getElementsByClassName('popust')[0].value;

    if (popust == "") {
        popust = "0";
    }

    for (let i = 0; i < izdelki.length; i++) {
        skupaj += parseFloat(izdelki[i][4]);
    }

    let czp = skupaj - (skupaj * parseFloat(popust * 0.01));

    izdelki.push(['', '', '', 'SKUPAJ:', skupaj])
    izdelki.push(['', '', '', 'POPUST: ' + popust + "%", '']);
    izdelki.push(['', '', '', 'SKUPAJ Z POPUSTOM:', Math.round(czp * 100) / 100]);



    doc.autoTable({
        html: "#wineTable",
        startY: 150
    })

    doc.autoTable({
        theme: 'grid',
        head: [
            ['Naziv', 'Kolicina', 'Enota', 'Cena v EUR', "Vrednost v EUR"]
        ],
        body: izdelki,
    })
}

document.getElementsByClassName('dodP')[0].onclick = () => {
    let flag1 = document.getElementsByClassName('naslovnik')[0].value;
    let flag2 = document.getElementsByClassName('naslov')[0].value;
    let flag3 = document.getElementsByClassName('posta')[0].value;
    let flag4 = document.getElementsByClassName('ds')[0].value;

    if (lock) {
        document.getElementsByClassName('info')[0].style.color = "red";
        document.getElementsByClassName('info')[0].style.animationPlayState = "running";
        document.getElementsByClassName('info')[0].innerHTML = "! Kupec ze obstaja !";
        return;
    }

    if (flag1 == "" || flag2 == "" || flag3 == "" || flag4 == "") {
        document.getElementsByClassName('info')[0].style.color = "red";
        document.getElementsByClassName('info')[0].style.animationPlayState = "running";
        document.getElementsByClassName('info')[0].innerHTML = "! Mankajoci podatki !";
        return;
    }

    dodaj_placnika({
        naslovnik: flag1,
        naslov: flag2,
        posta: flag3,
        ds: flag4
    });

    lock = true;

    document.getElementsByClassName('info')[0].style.color = "green";
    document.getElementsByClassName('info')[0].style.animationPlayState = "running";
    document.getElementsByClassName('info')[0].innerHTML = "Kupec dodan";

}

function dokoncaj() {

    getData();

    if (izdelki.length <= 0) {
        document.getElementsByClassName('info')[0].style.color = "red";
        document.getElementsByClassName('info')[0].style.animationPlayState = "running";
        document.getElementsByClassName('info')[0].innerHTML = "! NI IZDELKOV !";
        return;
    } else if (lock == false) {
        document.getElementsByClassName('info')[0].style.color = "red";
        document.getElementsByClassName('info')[0].style.animationPlayState = "running";
        document.getElementsByClassName('info')[0].innerHTML = "! NI KUPCA !";
        return;
    }

    doc.setFontSize(12);
    doc.text("Reja Silvan in Bortu Kozana 90a", 10, 20);
    doc.text("5212 Dobrovo", 10, 30);

    getData();

    let racun = {
        st_rac: parseInt(document.getElementsByClassName('metadata')[0].innerHTML),
        datum: document.getElementsByClassName('datum')[0].value,
        kraj: document.getElementsByClassName('kraj')[0].value,
        dos: new Date(Date.now()),
        rp: "PLACANO",
        trr: document.getElementsByClassName('trr')[0].value
    }

    racun_info(racun)

    naredi_tabelo();

    izdelki = [];
    izprazni();

    lock = false;


    var logo_url = "logo.jpg";
    getImgFromUrl(logo_url, function (img) {
        generatePDF(img);
        getData();
        doc.save('racun-' + document.getElementsByClassName('metadata')[0].innerHTML + '.pdf');
        doc = new jsPDF(options);
    });
}

function dodaj_v_kosarico() {
    let idea = document.getElementsByClassName('noteGrid')[0];
    let ime_izdelka = document.getElementsByClassName('naziv')[0];

    if (ime_izdelka.value == "") {
        return;
    } else {

        if (dodaj_izdelek()) {
            var bodyHolder = document.createElement('div');
            bodyHolder.className = 'bodyHolder';

            bodyHolder.style.width = 50 * ime_izdelka.value.length / 3 + 5 + "px";
            bodyHolder.style.minWidth = 50 * ime_izdelka.value.length / 3 + 5 + "px";
            bodyHolder.style.maxWidth = 50 * ime_izdelka.value.length / 3 + 5 + "px";

            bodyHolder.innerText = ime_izdelka.value;

            let x_sign = document.createElement('div');
            x_sign.className = "removeItem"
            x_sign.innerText = "X";
            x_sign.onclick = () => {
                x_sign.parentElement.remove();
                for (let i = 0; i < izdelki.length; i++) {

                    if (izdelki[i][0] == x_sign.parentElement.innerText.split('X')[0]) {
                        izdelki.splice(i, 1);
                    }
                }
            }

            bodyHolder.appendChild(x_sign);

            idea.appendChild(bodyHolder);


            let button = document.createElement('input');

            if (document.getElementsByClassName('notes')[0].children.length <= 2) {
                button.type = 'submit';
                button.className = "nr";
                button.value = "Dokoncaj";
                button.onclick = () => {
                    dokoncaj();
                }
                document.getElementsByClassName('notes')[0].appendChild(button);
            }
            izprazni(true);

        } else {
            document.getElementsByClassName('info')[0].style.color = "red";
            document.getElementsByClassName('info')[0].style.animationPlayState = "running";
            document.getElementsByClassName('info')[0].innerHTML = "! Neveljavn izdelek !";
        }
    }
}