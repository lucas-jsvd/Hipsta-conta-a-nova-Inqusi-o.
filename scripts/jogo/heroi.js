class Heroi extends Personagem {
  constructor(imagem, proporcao, num_colunas, num_linhas){
    super(imagem, proporcao, num_colunas, num_linhas)
    this.vel_pulo = 0;
    this.alt_max_pulo = 0;
    this.no_chao = true;
    this.pulando = false;
  }
  
  
  define_pular(vel_pulo, alt_max_pulo){
    this.vel_pulo = vel_pulo;
    this.alt_max_pulo = windowHeight - (this.altura_pers_prop + alt_max_pulo);
  }
  
  teste(){
    if (this.no_chao){
      this.pulando = true;
      this.no_chao = false;
    }
  }
  
  pular(){
    if (this.pulando){
      this.pos_atual_y -= this.vel_pulo;
    }
    if (this.pos_atual_y <= this.alt_max_pulo)
    {
      this.pulando = false;
    }
  }
}