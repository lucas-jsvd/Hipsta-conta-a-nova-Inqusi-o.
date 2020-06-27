class Inimigo extends Personagem {
  constructor(imagem, proporcao, num_colunas, num_linhas, total_sprits) {
    super(imagem, proporcao, num_colunas, num_linhas, total_sprits);
    this.velocidade = 0;
    this.distancia = 0;
    this.fora_tela = false;
  }

  define_velocidade(velocidade) {
    this.velocidade = velocidade
    print(this.velocidade)
  }

  move() {
    if (this.fora_tela == false) {
      this.anim_spriter()
      this.pos_atual_x -= this.velocidade;
    }
    if (this.pos_atual_x < 0 - this.largura_pers_prop) {
      this.fora_tela = true
    }
  }

  reposiciona(nova_pos_inicial){
    this.pos_atual_x = nova_pos_inicial;
    this.fora_tela = false;
  }
}