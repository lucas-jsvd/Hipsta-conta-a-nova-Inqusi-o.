class Cenario {
  constructor(imagem, posX, velocidade) {
    this.imagem = imagem;
    this.posX = posX
    this.velocidade = velocidade
  }

  exibe() {
    image(this.imagem, this.posX, 0, windowWidth, windowHeight);
  }

  anim_spriter() {
    if (this.posX <= - windowWidth) {
      this.posX = posX
    }
    this.posX -= this.velocidade
  }
}