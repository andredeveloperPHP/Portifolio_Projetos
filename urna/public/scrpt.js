/**
 * Controla tudo que iremos fazer com esse arquivo script, Preciso primeiro ter uma variavel pra controlar as informações
 * primeiro declararemos as variaveis para cada uma das informações:
 * 
 * Nota: No console de developer se usarmos:
 * se usarmos SeuVotoPara.style.display='none'  irei remover ele da tela;
 * se eu quiser alterar o valor de cargo:  cargo.innerHTML = "Lula Ladrão";
 * se eu quiser remover o conteudo de baixo: descricao.innerHTML = "";
 * se eu remover o '.d-2' completamente com o comando: aviso.style.display = 'none' removerei a informação de aviso;
 * */

// VARIAVEIS DE AMBIENTE:
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let control = document.getElementsByClassName('d-1-3')[0];
let fim = document.getElementsByClassName('d-1')[0];
let descricaoFim = document.getElementsByClassName('d-2')[0];
let seuVotoPara = document.querySelector('.d-1-1 span') //aqui estou selecionando dentro da classe d-1-1 a tag span (SEU VOTO PARA)
let cargo = document.querySelector('.d-1-2 span') //aqui estou selecionando o cargo de Vereador
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')


/**
 * Controlando a parte Lateral de .d-1-right
 * lateral.innerHTML = "";  eu removo as fotos dos candidatos
 * -----------------------------------------------------------
 * controlando a area dos numeros:
 * numeros.innerHTML = ""; eu removo aos Numeros;
 * *  */
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3');

/**
 * Colocando ações em cada um dos botões da minha urna Eletronica:
 * criando as funcionalidades:
 */

function Clicou(n) {
    //irei verificar se tem um quadradinho com o pisca ativado:
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero != null) { //se ele for diferente de nullo, ele esta apto para adicionar
        elNumero.innerHTML = n;

        //agora estou concatenando o proprio numero com o n
        numero = `${numero}${n}`;

        /**
         * remove o numero e passa para o proximo.
         * O proximo item ira começar a piscar para receber o outro numero.
         * 
         */
        elNumero.classList.remove('pisca');
        //fazendo uma verificação dos itens selcionados

        if (elNumero.nextElementSibling !== null) { //se for diferente de null, tem o pisca.
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            //vou chamar a função atualiza inteface:
            atualizaInterface();
        }

    }

}

function Branco() {
    //processo de Voto em Branco

    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numero.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
    control.style.display = 'none';
    //console.log(document.getElementsByClassName('d-1-3')[0]);

}

function Corrige() {
    //estou chamado a function começar etapa para zerar a minha urna:
    comecarEtapa();

}
//confimando o voto, posso enviar minhas informações para um webservice.

function Confirma() {

    let etapa = etapas[etapaAtual];

    let votoConf = false;

    if (votoBranco = false) {
        votoBranco = true;
        console.log("Confirmando Voto em BRANCO...!");

    } else if (numero.length === etapa.numeros) {
        votoConf = true;
        console.log("Confirmando como " + numero);
    }



    if (votoConf) {
        etapaAtual++;  //0  
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {

            fim.innerHTML = '<div class="aviso--gigante pisca"> FIM </div>';
            descricaoFim.innerHTML = '<div class="msg--desc pisca">Você Votou Num Ladrão</div>';
        }
    }
}
comecarEtapa();
/**
 * Começando com as variaveis de Ambiente, sempre iremos começar da etapa 0:
 * NOTA: de posse dessa variavel, eu consigo saber tudo sobre o estado atual.
 * então se fizermos: etapas[etapaAtual] no item do meu array! eu vou ter = {titulo: "VEREADOR", numeros: 5, candidatos: array(2)}
 */

/**
 * Vamos criar uma função chamada começar etapa:
 * 1° Essa função irá: Limpar a minha tela.
 * 2° Pegar as Informações da Etapa atual!
 * 3° Ela vai preencher o que precisa ser preenchido!
 */

//FUNÇÃO:
function comecarEtapa() {

    let etapa = etapas[etapaAtual];
    control.style.display = 'block';

    // Dentro da variavel etapa eu tenho meu array da chave;
    let numeroHTML = '';
    numero = '';
    votoBranco = false;
    //agora vamos criar um looping que vai rodar 5 vezes, e que cada uma dessas vezes, vamos montar o html:

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML = '<div class="numero pisca"></div>'
        } else {
            numeroHTML += '<div class="numero"></div>';
            //aqui no final irei ter 05 caras de numeros
        }

    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    // note que aqui estou buscando a chave titulo do arquivo etapas.js
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML; //Estou preenchendo ela acima linha 49;
}

/**
 * Criando uma função de Atualização de interface, onde ele pega a variavel let numeros;
 * Vou executar ela toda vez que fizer uma ação: digitar um numero ele vai preencher o numero e atualizar as informações
 *  */
function atualizaInterface() {
    //console.log(numero);
    //agora vou procurar um candidato que tenha na variavel numero:

    let etapa = etapas[etapaAtual];

    //fazemdo a Busca pelo meu candidato:

    let candidato = etapa.candidatos.filter((item) => {
        //vamos verificar se o item. candidatos do meu array etapas.js e igual ao numero que digitei:

        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        //ou seja se ele achou algum candidato:
        candidato = candidato[0];
        //seu voto vai aparecer agora:
        seuVotoPara.style.display = 'block';
        //aviso aparece:
        aviso.style.display = 'block';
        //descrição do cara
        descricao.innerHTML = `Nome:${candidato.nome}<br/>Partido:${candidato.partido}`;
        //foto do camarada:
        let fotosHtml = '';
        for (let i in candidato.fotos) {
            fotosHtml += `<div class="d-1-image"><img src="./images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
        }
        lateral.innerHTML = fotosHtml;

    } else {
        //Se não achar um candidato então o voto sera Nulo:
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-- pisca"> VOTO NULO </div>'

    }

    console.log("Candidato", candidato);

}
comecarEtapa();









