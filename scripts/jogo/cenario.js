class Cenario{
  constructor(imagem, posX){
    this.imagem = imagem;
    this.posX = posX
  }
  
  exibe(){
    image(this.imagem, this.posX, 0, windowWidth, windowHeight);
  }
  
  anim_spriter(){
    if (this.posX <= - windowWidth) {
      this.posX = posX
    }
    this.posX --
  }
}