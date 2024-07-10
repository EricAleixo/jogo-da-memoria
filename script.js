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

    // Cria pares de imagem e nome
    const cardsArray = [];
    imgs.forEach(img => {
        cardsArray.push({ type: 'image', content: img });
        cardsArray.push({ type: 'name', content: img });
    });

    shuffle(cardsArray);

    let cardsHTML = '';
    cardsArray.forEach((card) => {
        if (card.type === 'image') {
            cardsHTML += `<div class="cards">
                <i class="bi bi-question-circle"></i>
                <div class="img" id="${card.content}" style="background:url('cards/${card.content}.jpeg')"></div>
            </div>`;
        } else {
            cardsHTML += `<div class="cards">
                <i class="bi bi-question-circle"></i>
                <div class="img name" id="${card.content}">${card.content}</div>
            </div>`;
        }
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
        let corresponde = primeiraCarta.querySelector('.img, .name').id === segundaCarta.querySelector('.img, .name').id;
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

const btnResetar = document.querySelector("#btn-reset")
btnResetar.addEventListener("click", ()=>{
    location.reload()
})