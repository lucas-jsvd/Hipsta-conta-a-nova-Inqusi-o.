'use strict'

class Vida {
  constructor (imgVida) {
    this.imgVida = imgVida
  }

  draw (heroi) {
    for (let numVida = 0; numVida < heroi.quantVida; numVida++) {
      image(this.imgVida, 0 + windowHeight/10 * numVida, windowHeight / 20, windowWidth / 20, windowHeight / 20)
    }
  }
}
