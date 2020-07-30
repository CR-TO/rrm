async function open_options() {
    let holder = document.getElementsByClassName('bottomHolder')[0];

    if (document.getElementsByClassName('tmp')[0].style.visibility == "visible") {
        let elm = document.getElementsByClassName('tmp')[0];

        let len = elm.children.length;
        for (let i = 0; i < len; i++) {
            elm.children[i].style.visibility = "hidden";
        }
        elm.style.transition = "800ms";
        elm.style.width = "0px";
        elm.style.height = "0px";

        holder.children[3].style.visibility = "hidden";
        return;
    } else {

        let elm = document.getElementsByClassName('tmp')[0];
        document.getElementsByClassName('tmp')[0].style.visibility = "visible"
        elm.style.transition = "1.8s";
        elm.style.width = "500px";
        elm.style.height = "300px";
        await sleep(1450);
        document.getElementsByClassName('htrr')[0].style.visibility = "visible";
        document.getElementsByClassName('htrr')[1].style.visibility = "visible";
        document.getElementsByClassName('trr')[0].style.visibility = "visible";
        document.getElementsByClassName('kraj')[0].style.visibility = "visible";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}