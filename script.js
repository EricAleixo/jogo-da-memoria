document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector("#container");
    const imgs = [
        "bakery",
        "billboard",
        "cow",
        "padlock",
        "keychain",
        "rabbit",
        "sand-castle",
        "sea",
        "sheep",
        "ship",
        "wolf",
    ];

    const cardsArray = [...imgs, ...imgs];

    shuffle(cardsArray);

    let cardsHTML = '';
    cardsArray.forEach((card) => {
        cardsHTML += `<div class="cards">
            <i class="bi bi-question-circle"></i>
            <div class="img" style="background:url('cards/${card}.jpeg')"></div>
        </div>`;
    });
    main.innerHTML = cardsHTML;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const cartas = document.querySelectorAll('.cards');
    let cartaVirada = false;
    let travarTabuleiro = false;
    let primeiraCarta, segundaCarta;

    function virarCarta() {
        if (travarTabuleiro) return;
        if (this === primeiraCarta) return;

        this.classList.add('virar');

        if (!cartaVirada) {
            cartaVirada = true;
            primeiraCarta = this;
            return;
        }

        segundaCarta = this;

        verificarCorrespondencia();
    }

    function verificarCorrespondencia() {
        let corresponde = primeiraCarta.querySelector('.img').style.backgroundImage === segundaCarta.querySelector('.img').style.backgroundImage;

        corresponde ? desativarCartas() : desvirarCartas();
    }

    function desativarCartas() {
        primeiraCarta.removeEventListener('click', virarCarta);
        segundaCarta.removeEventListener('click', virarCarta);

        primeiraCarta.classList.add('congelar');
        segundaCarta.classList.add('congelar');

        resetarTabuleiro();
    }

    function desvirarCartas() {
        travarTabuleiro = true;

        setTimeout(() => {
            primeiraCarta.classList.remove('virar');
            segundaCarta.classList.remove('virar');

            resetarTabuleiro();
        }, 1500);
    }

    function resetarTabuleiro() {
        [cartaVirada, travarTabuleiro] = [false, false];
        [primeiraCarta, segundaCarta] = [null, null];
    }

    cartas.forEach(carta => carta.addEventListener('click', virarCarta));
});
