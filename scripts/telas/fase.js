class Fase {
    constructor() {
        this.cenario;
        this.cenario2;
        this.img_ini_gotinha;
        this.img_ini_troll;
        this.img_ini_got_voadora;
        this.img_background;
        this.lista_inimigos = [];
        this.lista_cenarios = [];
        this.som_fundo;
    }

    preload() {
        this.img_background = loadImage("imagens/cenario/floresta.png");
        this.img_ini_gotinha = loadImage("imagens/inimigos/gotinha.png");
        this.img_ini_troll = loadImage("imagens/inimigos/troll.png");
        this.img_ini_got_voadora = loadImage("imagens/inimigos/gotinha-voadora.png");
        this.som_fundo = loadSound('sons/trilha_jogo.mp3');
    }

    setup() {
        this.cria_cenario(this.img_background, 0, windowHeight / 80);
        this.cria_cenario(this.img_background, windowWidth, windowHeight / 80);
        this.cria_inimigo(this.img_ini_gotinha, 0.15, 4, 7, 28, windowWidth, windowHeight, windowHeight / 45, 0.3, 0.8, 0.2, 0.6);
        this.cria_inimigo(this.img_ini_troll, 0.40, 5, 6, 28, windowWidth + 1600, windowHeight + 20, windowHeight / 45, 0.5, 0.4, 0.17, 0.65);
        this.cria_inimigo(this.img_ini_got_voadora, 0.25, 3, 6, 16, windowWidth + 800, windowHeight * 0.7, windowHeight / 45, 0.40, 0.35, 0.25, 0.5);
        this.som_fundo.loop();
    }

    draw() {
        this.func_cenarios(this.lista_cenarios);
        this.func_inimigos(this.lista_inimigos);
    }

    cria_inimigo(imagem_inimigo, proporcao, num_colunas, num_linhas, total_sprits, pos_ini_x, pos_ini_y, velocidade, precisao_x_inicial, precisao_x_final, precisao_y_inicial, precisao_y_final) {
        let obj_ini = new Inimigo(imagem_inimigo, proporcao, num_colunas, num_linhas, total_sprits)
        obj_ini.define_pos_ini(pos_ini_x = pos_ini_x - obj_ini.largura_pers_prop, pos_ini_y = pos_ini_y - obj_ini.altura_pers_prop)
        obj_ini.define_velocidade(velocidade)
        obj_ini.define_shap(precisao_x_inicial, precisao_x_final, precisao_y_inicial, precisao_y_final)
        this.lista_inimigos.push(obj_ini)
    }

    cria_cenario(imagem, posX, velocidade){
        let obj_cenario = new Cenario(imagem, posX, velocidade);
        this.lista_cenarios.push(obj_cenario)
    }

    func_inimigos(lista_inimigos) {
        for (let obj_inimigo of lista_inimigos) {
            obj_inimigo.exibe();
            obj_inimigo.move();
        }
    }

    func_cenarios(lista_cenario) {
        for (let obj_cenario of lista_cenario){
            obj_cenario.exibe();
            obj_cenario.anim_spriter();
        }
    }



}