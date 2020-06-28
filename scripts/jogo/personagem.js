'use strict'

class Personagem {
  constructor (imagem, proporcao, numColunas, numLinhas, totalSprits) {
    this.imagem = imagem
    this.proporcao = proporcao
    this.numColunas = numColunas
    this.numLinhas = numLinhas
    this.totalSprits = totalSprits
    this.larguraPersonagem = this.imagem.width / this.numColunas
    this.alturaPersonagem = this.imagem.height / this.numLinhas
    this.alturaPersProp = ((proporcao - (this.alturaPersonagem / windowHeight)) * windowHeight) + this.alturaPersonagem
    this.larguraPersProp = ((proporcao - (this.larguraPersonagem / windowHeight)) * windowHeight) + this.larguraPersonagem
    this.posIniX = 0
    this.posIniY = 0
    this.posAtualX = 0
    this.posAtualY = 0
    this.matrixAnim = this.criaMatrixAnim()
    this.posXAnim = 0
    this.posYAnim = 0
    this.quadro = 0
    this.precisaoXInicial = 1
    this.precisaoXFinal = 1
    this.precisaoYInicial = 1
    this.precisaoYFinal = 1
  }

  definePosIni (posIniX, posIniY) {
    this.posIniX = posIniX
    this.posIniY = posIniY
    this.posAtualX = this.posIniX
    this.posAtualY = this.posIniY
  }

  defineShap (precisaoXInicial, precisaoXFinal, precisaoYInicial, precisaoYFinal) {
    this.precisaoXInicial = precisaoXInicial
    this.precisaoXFinal = precisaoXFinal
    this.precisaoYInicial = precisaoYInicial
    this.precisaoYFinal = precisaoYFinal
  }

  exibe () {
    image(this.imagem, this.posAtualX, this.posAtualY, this.larguraPersProp, this.alturaPersProp, this.posXAnim, this.posYAnim, this.larguraPersonagem, this.alturaPersonagem)
  }

  criaMatrixAnim () {
    const matrix = []
    for (let linha = 0; linha <= this.numLinhas - 1; linha++) {
      for (let coluna = 0; coluna <= this.numColunas - 1; coluna++) {
        matrix.push([this.larguraPersonagem * coluna, this.alturaPersonagem * linha])
        this.totalSprits--
        if (this.totalSprits === 0) {
          break
        }
      }
    }
    return matrix
  }

  animSpriter () {
    [this.posXAnim, this.posYAnim] = this.matrixAnim[this.quadro]
    this.quadro++
    if (this.quadro >= this.matrixAnim.length) {
      this.quadro = 0
    }
  }
}
