var button = document.getElementById("container-button");
var container = document.getElementById("container-login");

var container2 = document.getElementById("container-jogo");
container2.style.display = "none";

var nomeJogador1 = document.getElementById("jogadorX");
var nomeJogador2 = document.getElementById("jogadorO");


//validar se todos os campos foram preenchidos
function validaCampo(){
    let element = document.getElementById("jogadorX");
    let element2 = document.getElementById("jogadorO");

    if (element.value == "" || element2.value == ""){
        alert("Nome não informado");
        return 0;
    }
}

//ir para a pagina do jogo
button.addEventListener("click", function() {
    if (validaCampo() != 0){
        container.style.display = 'none'
        container2.style.display = 'block'
        exibeNome();
    } 
})

//exibir nome dos jogadores
function exibeNome(){
        if (checarTurno){
            document.getElementById("subtitulo-pagina").textContent= ("É a sua vez, " + nomeJogador1.value + "!");
      } else {
            document.getElementById("subtitulo-pagina").textContent= ("É a sua vez, " + nomeJogador2.value + "!");
      }
    
}

const celulas = document.querySelectorAll(".celula");
var checarTurno = true; //true = vez do X; false = vez do O

// definir caracter de cada jogador
const jogadorX = "X";
const jogadorO = "O";

const vitoria = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

document.addEventListener("click", (event) => {
    if(event.target.matches(".celula")){ //verifica se o clique foi na celula
        jogar(event.target.id);
    }
});

function jogar(id){
    const celula = document.getElementById(id);

    //identificar de quem é o turno
    turno = checarTurno ? jogadorX : jogadorO;
    celula.textContent = turno; //atribuir a celula o valor do jogador que está jogando

    //definir que o dono da celula é quem clicou
    celula.classList.add(turno);

    checarStatus(turno);
}

//identificar se: ganhou, empatou, nada acontece
function checarStatus(turno) {

    //array geral: se algum dos arrays retornar true, o retorno da funcao sera true
    const vencedor = vitoria.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno); //array interno: ve se o array das celulas bate com o dono da celula
       })
    })

    if (vencedor) {
        encerrarJogo(turno); //retorna quem vencer
    } else if (checarEmpate() == 0) {
        encerrarJogo();      //nao retorna nada
    } else {
         //alternar a vez entre os jogadores
        checarTurno = !checarTurno;
        exibeNome();
    }
}

function checarEmpate(){
    let x = 0;
    let o = 0;

    for (index in celulas){
        if(!isNaN(index)){
            if(celulas[index].classList.contains(jogadorX)){
                x++;
            }
    
            if (celulas[index].classList.contains(jogadorO)) {
                o++;
            }
        }
    }

    if (x + o == 9){
        return 0;
    }
}

function encerrarJogo (vencedor = null) { //esse parametro permite receber um vencedor ou nada
    if (vencedor){
        if (checarTurno) {
            alert("Parabéns, " + nomeJogador1.value + "! Você venceu!")
        } else {
            alert("Parabéns, " + nomeJogador2.value + "! Você venceu!")
        }
    } else {
        alert("Empate! Resolvam na próxima :D");
    }
}