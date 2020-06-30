'use strict'

class Fase {
  constructor (imgBackground, listaImgInimigos, somFundo) {
    this.listaInimigos = []
    this.listaCenarios = []
    this.lista_img_inimigos = listaImgInimigos
    this.imgBackground = imgBackground
    this.somFundo = somFundo
  }

  setup () {
    this.criaCenario(this.imgBackground, 0, windowHeight / 80)
    this.criaCenario(this.imgBackground, windowWidth, windowHeight / 80)
    this.criaInimigo(this.lista_img_inimigos[0], 0.15, 4, 7, 28, windowWidth, windowHeight, windowHeight / 40, 0.3, 0.8, 0.2, 0.6)
    this.criaInimigo(this.lista_img_inimigos[1], 0.40, 5, 6, 28, windowWidth + 600, windowHeight + 20, windowHeight / 45, 0.5, 0.4, 0.17, 0.65)
    this.criaInimigo(this.lista_img_inimigos[2], 0.25, 3, 6, 16, windowWidth + 1200, windowHeight * 0.7, windowHeight / 42, 0.4, 0.35, 0.25, 0.5)
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
        const variacaoDistancia = random(windowWidth/2, windowWidth/1.2)
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
