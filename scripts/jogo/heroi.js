'use strict'

class Heroi extends Personagem {
  constructor (imagem, somPulo, proporcao, numColunas, numLinhas, totalSprits, quantVida) {
    super(imagem, proporcao, numColunas, numLinhas, totalSprits)
    this.velPulo = 0
    this.altMaxPulo = 0
    this.noChao = true
    this.pulando = false
    this.quantPuloMax = 2
    this.quantPuloAtual = 0
    this.posPuloY = 0
    this.somPulo = somPulo
    this.quantVida = quantVida
    this.imune = false
  }

  definePular (velPulo, altMaxPulo) {
    this.velPulo = velPulo
    this.altMaxPulo = altMaxPulo
  }

  verificarPular () {
    if (this.noChao || this.quantPuloAtual < this.quantPuloMax) {
      this.posPuloY = this.posAtualY
      this.pulando = true
      this.noChao = false
      this.quantPuloAtual++
      this.somPulo.play()
    }
  }

  pular () {
    if (this.pulando) {
      this.posAtualY -= this.velPulo
    }
    if (this.posAtualY <= this.posPuloY - this.altMaxPulo) {
      this.pulando = false
    }
  }

  verificaColisao (objInimigo, debug = false) {
    if (debug) {
      noFill()
      rect(this.posAtualX + (this.larguraPersProp * this.precisaoXInicial), this.posAtualY + (this.alturaPersProp * this.precisaoYInicial), this.larguraPersProp * this.precisaoXFinal, this.alturaPersProp * this.precisaoYFinal)
      noFill()
      rect(objInimigo.posAtualX + (objInimigo.larguraPersProp * objInimigo.precisaoXInicial), objInimigo.posAtualY + (objInimigo.alturaPersProp * objInimigo.precisaoYInicial), objInimigo.larguraPersProp * objInimigo.precisaoXFinal, objInimigo.alturaPersProp * objInimigo.precisaoYFinal)
    }
    const colidiu = collideRectRect(this.posAtualX + (this.larguraPersProp * this.precisaoXInicial), this.posAtualY + (this.alturaPersProp * this.precisaoYInicial), this.larguraPersProp * this.precisaoXFinal, this.alturaPersProp * this.precisaoYFinal, objInimigo.posAtualX + (objInimigo.larguraPersProp * objInimigo.precisaoXInicial), objInimigo.posAtualY + (objInimigo.alturaPersProp * objInimigo.precisaoYInicial), objInimigo.larguraPersProp * objInimigo.precisaoXFinal, objInimigo.alturaPersProp * objInimigo.precisaoYFinal)
    return colidiu
  }

  dano () {
    this.quantVida--
    this.imunidade()
  }

  imunidade () {
    this.imune = !this.imune
  }
}
