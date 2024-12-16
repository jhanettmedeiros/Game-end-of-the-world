//Declaração de variáveis
var spriteJogador, spriteSolo, spriteTiro;
var inimigos =[];
var tiros =[];
var ultimoDisparo = 0;
var delayDisparo = 30;
var musica;

function preload() {
    musica = loadSound("./ativos/sons/California King - Bail Bonds.mp3");
}

function setup() {
    //Criando a tela de jogo
    canvas = createCanvas(windowWidth, windowHeight - 5);

    spriteSolo = createSprite(width/2, height, width, 13);

    spriteJogador = createSprite(25, height/2, 20,30);

    musica.loop(); // Toca a música em loop
    musica.setVolume(0.5); // Ajusta o volume para 50%
}

function draw() {

    background(0);

    if(keyDown("d") && spriteJogador.position.x <width - 10) {
        spriteJogador.position.x +=2;
    }
    
    if(keyDown("a") && spriteJogador.position.x > 10) {
        spriteJogador.position.x -=2;
    }
    
    if(keyDown("w") && spriteJogador.position.y > 15) {
        spriteJogador.position.y -=10;
    }

    spriteJogador.position.y += 0.98;
    spriteJogador.collide(spriteSolo);

    if(spriteJogador.position.y >height - 13 - 15) {
        spriteJogador.position.y = height - 13 -10;
    }

    criar_inimigos();

    if(keyDown("s") && frameCount - ultimoDisparo > delayDisparo) {
        disparos();
        ultimoDisparo = frameCount;
    }

    for(let i = inimigos.length - 1; i>0; i--) {
        for(let t = tiros.length - 1; t>0; t--) {
            if(tiros[t].overlap(inimigos[i])) {
                inimigos[i].remove();
                inimigos.splice(i,1);
                tiros[t].remove();
                tiros.splice(t,1);
                break;
            }
        }   
    }

    drawSprites();
}

function criar_inimigos() {
    if(frameCount % 150 ===0) {
        let spriteInimigo = createSprite(width + 100, height-13-10,20,30);
        spriteInimigo.velocity.x = -2;
        spriteInimigo.lifetime = 300;
        inimigos.push(spriteInimigo);
    }
} 

function disparos() {
    let spritetiro = createSprite(spriteJogador.position.x, spriteJogador.position.y, 10, 5);
    spritetiro.velocity.x = 5;
    spritetiro.lifetime = width / spritetiro.velocity.x; 
    tiros.push(spritetiro);
}

function windowResized() {
    location.reload();
  }