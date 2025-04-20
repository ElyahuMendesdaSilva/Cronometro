let rodando = false;
let tempoRestante = 0; 
let intervalo = null;
let contagem_regreciva = false;

document.querySelector("#full").addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Erro ao entrar no modo fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
});

document.querySelector("#Edit").addEventListener("click", () => {
    const { horas, minutos, segundos } = converterMilissegundos(tempoRestante);
    document.querySelector("#hr").value = horas.toString().padStart(2, '0') || "00";
    document.querySelector("#mi").value = minutos.toString().padStart(2, '0');
    document.querySelector(".se").value = segundos.toString().padStart(2, '0');
    tempoRestante = 0;
});

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("click", () => {
        rodando = false;
    });
});

document.querySelector("#PAUSE").addEventListener("click", () => {
    rodando = false;
})

function Start() {
    clearInterval(intervalo);

    const horas = parseInt(document.querySelector("#hr").value) || 0;
    const minutos = parseInt(document.querySelector("#mi").value) || 0;
    const segundos = parseInt(document.querySelector(".se").value) || 0;

    tempoRestante = (((horas * 60 + minutos) * 60) + segundos) * 1000;

    if (tempoRestante > 0) {
        rodando = true;
        intervalo = setInterval(Update, 1000);
    }
}

function Update() {

    if (tempoRestante <= 0) {
        contagem_regreciva = false;
        document.querySelector(".GUI").style.display = "flex";
        document.querySelector(".GUI-regresiva").style.display = "none";
        document.querySelector("body").style.backgroundColor = "#131313";

        clearInterval(intervalo);
        rodando = false;
        return;
    }

    if (rodando) {
        tempoRestante -= 1000;
    }

    const { horas, minutos, segundos } = converterMilissegundos(tempoRestante);

    document.querySelector("#hr").value = horas.toString().padStart(2, '0');
    document.querySelector("#mi").value = minutos.toString().padStart(2, '0');
    document.querySelector(".se").value = segundos.toString().padStart(2, '0');
    document.querySelector(".sefinal").value = document.querySelector(".se").value;

    if (horas === 0 && minutos === 0 && segundos <= 5) {
        document.querySelector(".GUI").style.display = "none";
        document.querySelector(".GUI-regresiva").style.display = "flex";

        if (contagem_regreciva) {
            contagem_regreciva = false;
            document.querySelector("body").style.backgroundColor = "white";
            document.querySelector(".sefinal").style.color = "black";
        } else {
            contagem_regreciva = true;
            document.querySelector("body").style.backgroundColor = "#131313";
            document.querySelector(".sefinal").style.color = "white";
        }
    }
}

function converterMilissegundos(ms) {
    const horas = Math.floor(ms / (1000 * 60 * 60));
    const minutos = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((ms % (1000 * 60)) / 1000);
    return { horas, minutos, segundos };
}


document.querySelector("#Start").addEventListener("click", () => {
    if (tempoRestante !== 0) {
        rodando = true;
    } else {
        Start();
    }
});
