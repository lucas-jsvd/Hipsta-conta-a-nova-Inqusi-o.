class Inimigo extends Personagem {
  constructor(imagem, proporcao, num_colunas, num_linhas, total_sprits) {
    super(imagem, proporcao, num_colunas, num_linhas, total_sprits);
    this.velocidade = 0;
  }

  define_velocidade(velocidade) {
    this.velocidade = velocidade
  }

  move() {
    this.anim_spriter()
    this.pos_atual_x -= this.velocidade;
    if (this.pos_atual_x < 0 - this.largura_pers_prop) {
      this.pos_atual_x = windowWidth;
    }
  }
}