'use strict'

class Inimigo extends Personagem {
  constructor (imagem, proporcao, numColunas, numLinhas, totalSprits) {
    super(imagem, proporcao, numColunas, numLinhas, totalSprits)
    this.velocidade = 0
    this.distancia = 0
    this.foraTela = false
  }

  defineVelocidade (velocidade) {
    this.velocidade = velocidade
  }

  move () {
    if (this.foraTela === false) {
      this.animSpriter()
      this.posAtualX -= this.velocidade
    }
    if (this.posAtualX < 0 - this.larguraPersProp) {
      this.foraTela = true
    }
  }

  reposiciona (novaPosInicial) {
    this.posAtualX = novaPosInicial
    this.foraTela = false
  }
}
