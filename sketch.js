let img_personagem;
let img_game_over;
let fr = 30;
let som_pulo;
let gravidade;
let heroi;
let pontuacao = 0;
let pontuacao_adcional = 4 / fr;
let fase1;

function preload() {
  fase1 = new Fase();
  fase1.preload();
  img_game_over = loadImage("imagens/telas/game-over.png");
  img_heroi = loadImage("imagens/personagem/correndo.png");
  som_pulo = loadSound('sons/somPulo.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  gravidade = windowHeight / 35;
  heroi = cria_heroi(img_heroi, som_pulo, 0.3, 4, 4, 16, windowHeight / 30, windowHeight / 3, 0.30, 0.3, 0.1, 0.8);
  fase1.setup();
}

function keyPressed() {
  if (key == "ArrowUp") {
    heroi.verificar_pular();
  }
}

function draw() {
  fase1.draw()
  func_herois(heroi);
  for (obj_inimigo of fase1.lista_inimigos) {
    if (heroi.verifica_colisao(obj_inimigo, true)) {
      noLoop();
      game_over();
      fase1.som_fundo.stop();
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