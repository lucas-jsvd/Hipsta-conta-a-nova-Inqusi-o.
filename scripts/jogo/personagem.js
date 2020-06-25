class Personagem {
  constructor(imagem, proporcao, num_colunas, num_linhas){
    this.imagem = imagem;
    this.proporcao = proporcao;
    this.num_colunas = num_colunas;
    this.num_linhas = num_linhas;
    this.largura_personagem = this.imagem.width /   this.num_colunas
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
  }
  
  
  define_pos_ini(pos_ini_x, pos_ini_y){
    this.pos_ini_x = pos_ini_x;
    this.pos_ini_y = pos_ini_y;
    this.pos_atual_x = this.pos_ini_x
    this.pos_atual_y = this.pos_ini_y
  }
  
  
  exibe(){
    image(this.imagem, this.pos_atual_x, this.pos_atual_y, this.largura_pers_prop, this.altura_pers_prop, this.posX_anim, this.posY_anim, this.largura_personagem, this.altura_personagem);
  }
  
  
  cria_matrix_anim(){
    let matrix = []
    for (let linha = 0; linha <= this.num_linhas - 1; linha++){
      for (let coluna = 0; coluna <= this.num_colunas - 1; coluna++){
        matrix.push([this.largura_personagem * coluna, this.altura_personagem * linha]);
      }
    }
    return matrix;
  }
  
  
  anim_spriter(){
    [this.posX_anim, this.posY_anim] = this.matrix_anim[this.quadro];
    this.quadro ++;
    if (this.quadro >= this.matrix_anim.length) {
      this.quadro = 0;
    }
  }
}