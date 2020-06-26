class Personagem {
  constructor(imagem, proporcao, num_colunas, num_linhas, total_sprits) {
    this.imagem = imagem;
    this.proporcao = proporcao;
    this.num_colunas = num_colunas;
    this.num_linhas = num_linhas;
    this.total_sprits = total_sprits;
    this.largura_personagem = this.imagem.width / this.num_colunas
    this.altura_personagem = this.imagem.height / this.num_linhas
    this.altura_pers_prop = ((proporcao - (this.altura_personagem / windowHeight)) * windowHeight) + this.altura_personagem;
    this.largura_pers_prop = ((proporcao - (this.largura_personagem / windowHeight)) * windowHeight) + this.largura_personagem;
    this.pos_ini_x = 0
    this.pos_ini_y = 0
    this.pos_atual_x = 0
    this.pos_atual_y = 0
    this.matrix_anim = this.cria_matrix_anim()
    this.posX_anim = 0
    this.posY_anim = 0
    this.quadro = 0
    this.precisao_x_inicial = 1
    this.precisao_x_final = 1
    this.precisao_y_inicial = 1
    this.precisao_y_final = 1
  }


  define_pos_ini(pos_ini_x, pos_ini_y) {
    this.pos_ini_x = pos_ini_x;
    this.pos_ini_y = pos_ini_y;
    this.pos_atual_x = this.pos_ini_x
    this.pos_atual_y = this.pos_ini_y
  }

  define_shap(precisao_x_inicial, precisao_x_final, precisao_y_inicial, precisao_y_final) {
    this.precisao_x_inicial = precisao_x_inicial
    this.precisao_x_final = precisao_x_final
    this.precisao_y_inicial = precisao_y_inicial
    this.precisao_y_final = precisao_y_final
  }


  exibe() {
    image(this.imagem, this.pos_atual_x, this.pos_atual_y, this.largura_pers_prop, this.altura_pers_prop, this.posX_anim, this.posY_anim, this.largura_personagem, this.altura_personagem);
  }


  cria_matrix_anim() {
    let matrix = []
    for (let linha = 0; linha <= this.num_linhas - 1; linha++) {
      for (let coluna = 0; coluna <= this.num_colunas - 1; coluna++) {
        matrix.push([this.largura_personagem * coluna, this.altura_personagem * linha]);
        this.total_sprits--
        if (this.total_sprits == 0) {
          break;
        }
      }
    }
    return matrix;
  }


  anim_spriter() {
    [this.posX_anim, this.posY_anim] = this.matrix_anim[this.quadro];
    this.quadro++;
    if (this.quadro >= this.matrix_anim.length) {
      this.quadro = 0;
    }
  }
}