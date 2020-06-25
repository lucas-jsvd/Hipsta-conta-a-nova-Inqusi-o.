class Heroi extends Personagem {
  constructor(imagem, som_pulo, proporcao, num_colunas, num_linhas) {
    super(imagem, proporcao, num_colunas, num_linhas)
    this.vel_pulo = 0;
    this.alt_max_pulo = 0;
    this.no_chao = true;
    this.pulando = false;
    this.quant_pulo_max = 2
    this.quant_pulo_atual = 0
    this.pos_pulo_y = 0
    this.som_pulo = som_pulo
  }


  define_pular(vel_pulo, alt_max_pulo) {
    this.vel_pulo = vel_pulo;
    this.alt_max_pulo = alt_max_pulo;
  }

  verificar_pular() {
    if (this.no_chao || this.quant_pulo_atual < this.quant_pulo_max) {
      this.pos_pulo_y = this.pos_atual_y
      this.pulando = true;
      this.no_chao = false;
      this.quant_pulo_atual++;
      this.som_pulo.play()
    }
  }

  pular() {
    if (this.pulando) {
      this.pos_atual_y -= this.vel_pulo;
    }
    if (this.pos_atual_y <= this.pos_pulo_y - this.alt_max_pulo) {
      print("oi")
      this.pulando = false;
    }
  }

  verifica_colisao(obj_inimigo, precisao) {
    let colidiu = collideRectRect(this.pos_atual_x, this.pos_atual_y, this.largura_pers_prop * precisao, this.altura_pers_prop * precisao, obj_inimigo.pos_atual_x, obj_inimigo.pos_atual_y, obj_inimigo.largura_pers_prop * precisao, obj_inimigo.altura_pers_prop * precisao);
    return colidiu;
  }
}