'use strict'

class Home {
  constructor (arqBackground, texto, arqFont) {
    this.arqBackground = arqBackground
    this.texto = texto
    this.arqFont = arqFont
    this.botao
  }

  preload () {
    this.background = loadImage(this.arqBackground)
    this.font = loadFont(this.arqFont)
  }

  setup () {
    this.cria_botao()
  }

  draw () {
    image(this.background, 0, 0, windowWidth, windowHeight)
    this.desenharTexto()
    this.botao.mousePressed(() => this.mudar_fase())
  }

  desenharTexto () {
    fill('black')
    textSize(windowWidth / 10)
    textFont(this.font)
    textAlign(CENTER)
    text(this.texto, windowWidth / 2, windowHeight / 3)
  }

  cria_botao () {
    this.botao = createButton('Jogar')
    this.botao.position(windowWidth / 2.35, windowHeight / 6 * 4)
    this.botao.addClass('botao-tela-inicial')
  }

  mudar_fase () {
    indiceFaseAtual = 1
    this.botao.remove()
  }
}
