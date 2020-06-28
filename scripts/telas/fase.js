'use strict'

class Fase {
  constructor () {
    this.listaInimigos = []
    this.listaCenarios = []
  }

  preload () {
    this.imgBackground = loadImage('imagens/cenario/floresta.png')
    this.imgIniGotinha = loadImage('imagens/inimigos/gotinha.png')
    this.imgIniTroll = loadImage('imagens/inimigos/troll.png')
    this.imgIniGotVoadora = loadImage('imagens/inimigos/gotinha-voadora.png')
    this.somFundo = loadSound('sons/trilha_jogo.mp3')
  }

  setup () {
    this.criaCenario(this.imgBackground, 0, windowHeight / 80)
    this.criaCenario(this.imgBackground, windowWidth, windowHeight / 80)
    this.criaInimigo(this.imgIniGotinha, 0.15, 4, 7, 28, windowWidth, windowHeight, windowHeight / 40, 0.3, 0.8, 0.2, 0.6)
    this.criaInimigo(this.imgIniTroll, 0.40, 5, 6, 28, windowWidth + 600, windowHeight + 20, windowHeight / 45, 0.5, 0.4, 0.17, 0.65)
    this.criaInimigo(this.imgIniGotVoadora, 0.25, 3, 6, 16, windowWidth + 1200, windowHeight * 0.7, windowHeight / 42, 0.4, 0.35, 0.25, 0.5)
    this.somFundo.loop()
  }

  draw () {
    this.funcCenarios(this.listaCenarios)
    this.funcInimigos(this.listaInimigos)
  }

  criaInimigo (imagemInimigo, proporcao, numColunas, numLinhas, totalSprits, posIniX, posIniY, velocidade, precisaoXInicial, precisaoXFinal, precisaoYInicial, precisaoYFinal) {
    const OBJINIMIGO = new Inimigo(imagemInimigo, proporcao, numColunas, numLinhas, totalSprits)
    OBJINIMIGO.definePosIni(posIniX = posIniX - OBJINIMIGO.larguraPersProp, posIniY = posIniY - OBJINIMIGO.alturaPersProp)
    OBJINIMIGO.defineVelocidade(velocidade)
    OBJINIMIGO.defineShap(precisaoXInicial, precisaoXFinal, precisaoYInicial, precisaoYFinal)
    this.listaInimigos.push(OBJINIMIGO)
  }

  criaCenario (imagem, posX, velocidade) {
    const OBJCENARIO = new Cenario(imagem, posX, velocidade)
    this.listaCenarios.push(OBJCENARIO)
  }

  funcInimigos (listaInimigos) {
    let indiceAnterior
    for (let indice = 0; indice < this.listaInimigos.length; indice++) {
      listaInimigos[indice].exibe()
      listaInimigos[indice].move()
      if (listaInimigos[indice].foraTela) {
        const variacaoDistancia = random(500, 800)
        if (indice - 1 < 0) {
          indiceAnterior = listaInimigos.length - 1
        } else {
          indiceAnterior = indice - 1
        }
        let novaPosInicial = listaInimigos[indiceAnterior].posAtualX + variacaoDistancia
        if (novaPosInicial < windowWidth) {
          novaPosInicial = windowWidth + listaInimigos[indiceAnterior].larguraPersonagem + variacaoDistancia
        }
        listaInimigos[indice].reposiciona(novaPosInicial)
      }
    }
  }

  funcCenarios (listaCenario) {
    for (const OBJCENARIO of listaCenario) {
      OBJCENARIO.exibe()
      OBJCENARIO.animSpriter()
    }
  }
}
