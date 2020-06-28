'use strict'

let imgHeroi
let imgGameOver
const FR = 30
let somPulo
let gravidade
let heroi
let pontuacao = 0
const PONTADICIONAL = 4 / FR
let fase1
let home
let listaFase = []
let indiceFaseAtual = 0
let imgBackground
let imgTelaInicial
let arqFont
let somFundo
let imgGotinha
let imgTroll
let imgGotVoador

function adcionarFase (fase) {
  listaFase.push(fase)
}

function preload () {
  imgTelaInicial = loadImage('imagens/telas/telaInicial.png')
  imgBackground = loadImage('imagens/cenario/floresta.png')
  arqFont = loadFont('imagens/font/fonteTelaInicial.otf')
  imgGameOver = loadImage('imagens/telas/game-over.png')
  imgHeroi = loadImage('imagens/personagem/correndo.png')
  somPulo = loadSound('sons/somPulo.mp3')
  somFundo = loadSound('sons/trilha_jogo.mp3')
  imgGotinha = loadImage('imagens/inimigos/gotinha.png')
  imgTroll = loadImage('imagens/inimigos/troll.png')
  imgGotVoador = loadImage('imagens/inimigos/gotinha-voadora.png')
}

function setup () {
  createCanvas(windowWidth, windowHeight)
  frameRate(FR)
  gravidade = windowHeight / 35
  defineSetup()
  realizaSetup(listaFase)
  heroi = criaHeroi(imgHeroi, somPulo, 0.3, 4, 4, 16, windowHeight / 30, windowHeight / 3, 0.30, 0.3, 0.1, 0.8)
}

function defineSetup () {
  home = new Home(imgTelaInicial, 'Hipsta conta a nova\n Inquisicao', arqFont)
  adcionarFase(home)
  fase1 = new Fase(imgBackground, [imgGotinha, imgTroll, imgGotVoador], somFundo)
  adcionarFase(fase1)
}

function keyPressed () {
  if (key === 'ArrowUp') {
    heroi.verificarPular()
  }
}

function draw () {
  listaFase[indiceFaseAtual].draw()
  if (indiceFaseAtual > 0) {
    funcHerois(heroi)
    aplicaGravidade(heroi)
    definePontuacao()
    colidiu(listaFase[indiceFaseAtual], heroi)
  }
}

function realizaSetup (listaFase) {
  for (const objFase of listaFase) {
    objFase.setup()
  }
}

function criaHeroi (imgHeroi, somPulo, proporcao, numcolunas, numLinhas, totalSprits, velPulo, altMaxPulo, precisaoXInicial, precisaoFinal, precisaoYInicial, precisaoYFinal) {
  const OBJHEROI = new Heroi(imgHeroi, somPulo, proporcao, numcolunas, numLinhas, totalSprits)
  OBJHEROI.definePosIni(0, windowHeight - OBJHEROI.alturaPersProp)
  OBJHEROI.definePular(velPulo, altMaxPulo)
  OBJHEROI.defineShap(precisaoXInicial, precisaoFinal, precisaoYInicial, precisaoYFinal)
  return OBJHEROI
}

function aplicaGravidade (personagem) {
  if (personagem.pulando === false && personagem.noChao === false) {
    personagem.posAtualY += gravidade
  }
  if (personagem.posAtualY >= personagem.posIniY) {
    personagem.posAtualY = personagem.posIniY
    personagem.noChao = true
    personagem.quantPuloAtual = 0
  }
}

function funcHerois (OBJHEROI) {
  OBJHEROI.exibe()
  OBJHEROI.animSpriter()
  OBJHEROI.pular()
}

function definePontuacao () {
  pontuacao += PONTADICIONAL
  textSize(windowHeight * 0.20)
  textAlign(RIGHT)
  fill('rgb(100%,0%,10%)')
  text(parseInt(pontuacao), windowWidth * 0.98, windowHeight * 0.2)
}

function gameOver () {
  const LARGURAPROP = ((0.35 - (imgGameOver.width / windowWidth)) * windowWidth) + imgGameOver.width
  const alturaProp = ((0.35 - (imgGameOver.height / windowHeight)) * windowHeight) + imgGameOver.height
  image(imgGameOver, windowWidth * 0.3, windowHeight * 0.4, LARGURAPROP, alturaProp)
}

function colidiu (fase, heroi) {
  for (const OBJINIMIGO of fase.listaInimigos) {
    if (heroi.verificaColisao(OBJINIMIGO, false)) {
      noLoop()
      gameOver()
      setTimeout(reiniar, 1000 * 5)
      fase.somFundo.stop()
      break
    }
  }
}

function reiniar () {
  indiceFaseAtual = 0
  listaFase = []
  defineSetup()
  realizaSetup(listaFase)
  loop()
}
