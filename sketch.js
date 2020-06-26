let img_personagem;
let img_background;
let img_game_over;
let img_ini_gotinha;
let img_ini_troll;
let img_ini_got_voadora;
let fr = 30;
let som_fundo;
let som_pulo;
let gravidade;
let heroi;
let lista_inimigos = [];
let cenario;
let cenario2;
let pontuacao = 0;
let pontuacao_adcional = 4 / fr;

function preload() {
  img_background = loadImage("imagens/cenario/floresta.png");
  img_game_over = loadImage("imagens/telas/game-over.png");
  img_heroi = loadImage("imagens/personagem/correndo.png");
  img_ini_gotinha = loadImage("imagens/inimigos/gotinha.png");
  img_ini_troll = loadImage("imagens/inimigos/troll.png");
  img_ini_got_voadora = loadImage("imagens/inimigos/gotinha-voadora.png")
  som_fundo = loadSound('sons/trilha_jogo.mp3');
  som_pulo = loadSound('sons/somPulo.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  gravidade = windowHeight / 35;
  cenario1 = new Cenario(img_background, posX = 0, windowHeight / 80);
  cenario2 = new Cenario(img_background, posX = windowWidth, windowHeight / 80);
  print(windowWidth, windowHeight);
  heroi = cria_heroi(img_heroi, som_pulo, 0.3, 4, 4, 16, windowHeight / 30, windowHeight / 3, 0.30, 0.3, 0.1, 0.8);
  cria_inimigo(img_ini_gotinha, 0.15, 4, 7, 28, windowWidth, windowHeight, windowHeight / 45, 0.3, 0.8, 0.2, 0.6);
  cria_inimigo(img_ini_troll, 0.40, 5, 6, 28, windowWidth + 1600, windowHeight + 20, windowHeight / 45, 0.5, 0.4, 0.17, 0.65);
  cria_inimigo(img_ini_got_voadora, 0.25, 3, 6, 16, windowWidth + 800, windowHeight * 0.7, windowHeight / 45, 0.40, 0.35, 0.25, 0.5);
  som_fundo.loop();
}

function keyPressed() {
  if (key == "ArrowUp") {
    heroi.verificar_pular();
  }
}

function draw() {
  func_cenarios(cenario1);
  func_cenarios(cenario2);
  func_herois(heroi);
  for (obj_inimigo of lista_inimigos) {
    func_inimigos(obj_inimigo);
    if (heroi.verifica_colisao(obj_inimigo, false)) {
      noLoop();
      game_over();
      som_fundo.stop();
      break;
    }
  }
  aplica_gravidade(heroi);
  define_pontuacao()
}


function cria_heroi(img_heroi, som_pulo, proporcao, num_colunas, num_linhas, total_sprits, vel_pulo, alt_max_pulo, precisao_x_inicial, precisao_x_final, precisao_y_inicial, precisao_y_final) {
  let obj_heroi = new Heroi(img_heroi, som_pulo, proporcao, num_colunas, num_linhas, total_sprits);
  obj_heroi.define_pos_ini(pos_ini_x = 0, pos_ini_y = windowHeight - obj_heroi.altura_pers_prop)
  obj_heroi.define_pular(vel_pulo, alt_max_pulo)
  obj_heroi.define_shap(precisao_x_inicial, precisao_x_final, precisao_y_inicial, precisao_y_final)
  return obj_heroi
}


function cria_inimigo(imagem_inimigo, proporcao, num_colunas, num_linhas, total_sprits, pos_ini_x, pos_ini_y, velocidade, precisao_x_inicial, precisao_x_final, precisao_y_inicial, precisao_y_final) {
  let obj_ini = new Inimigo(imagem_inimigo, proporcao, num_colunas, num_linhas, total_sprits)
  obj_ini.define_pos_ini(pos_ini_x = pos_ini_x - obj_ini.largura_pers_prop, pos_ini_y = pos_ini_y - obj_ini.altura_pers_prop)
  obj_ini.define_velocidade(velocidade)
  obj_ini.define_shap(precisao_x_inicial, precisao_x_final, precisao_y_inicial, precisao_y_final)
  lista_inimigos.push(obj_ini)
}


function aplica_gravidade(personagem) {
  if (personagem.pulando == false && personagem.no_chao == false) {
    personagem.pos_atual_y += gravidade;
  }
  if (personagem.pos_atual_y >= personagem.pos_ini_y) {
    personagem.pos_atual_y = personagem.pos_ini_y
    personagem.no_chao = true
    personagem.quant_pulo_atual = 0
  }
}

function func_herois(obj_heroi) {
  obj_heroi.exibe();
  obj_heroi.anim_spriter();
  obj_heroi.pular()
}

function func_inimigos(obj_inimigo) {
  obj_inimigo.exibe();
  obj_inimigo.move();
}

function func_cenarios(obj_cenario) {
  obj_cenario.exibe();
  obj_cenario.anim_spriter();
}

function define_pontuacao() {
  pontuacao += pontuacao_adcional;
  textSize(windowHeight * 0.20);
  textAlign(RIGHT)
  fill('rgb(100%,0%,10%)');
  text(parseInt(pontuacao), windowWidth * 0.98, windowHeight * 0.2)
}

function game_over() {
  largura_prop = ((0.35 - (img_game_over.width / windowWidth)) * windowWidth) + img_game_over.width;
  altura_prop = ((0.35 - (img_game_over.height / windowHeight)) * windowHeight) + img_game_over.height;
  image(img_game_over, windowWidth * 0.3, windowHeight * 0.4, largura_prop, altura_prop);
}