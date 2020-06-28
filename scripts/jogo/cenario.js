'use strict'

class Cenario {
  constructor (imagem, posXInicial, velocidade) {
    this.imagem = imagem
    this.posXAtual = posXInicial
    this.velocidade = velocidade
  }

  exibe () {
    image(this.imagem, this.posXAtual, 0, windowWidth, windowHeight)
  }

  animSpriter () {
    if (this.posXAtual <= -windowWidth) {
      this.posXAtual = windowWidth
    }
    this.posXAtual -= this.velocidade
  }
}
