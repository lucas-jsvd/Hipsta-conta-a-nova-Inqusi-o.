class Cenario {
  constructor(imagem, pos_x_inicial, velocidade) {
    this.imagem = imagem;
    this.pos_x_atual = pos_x_inicial;
    this.velocidade = velocidade;
  }

  exibe() {
    image(this.imagem, this.pos_x_atual, 0, windowWidth, windowHeight);
  }

  anim_spriter() {
    if (this.pos_x_atual <= -windowWidth) {
      this.pos_x_atual = windowWidth;
    }
    this.pos_x_atual -= this.velocidade;
  }
}