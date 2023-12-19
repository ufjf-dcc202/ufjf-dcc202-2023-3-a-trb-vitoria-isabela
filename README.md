[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/V8UrBiYG)

# Universidade Federal de Juiz de Fora
# DCC202-2023.3 - Desenvolvimento Web
# Professor Igor Knop
# Aluna: Vitória Isabela de Oliveira 202065097AC

***

# Esbugalhado

O jogo foi inspirado por uma história onde Beto Carneiro encontrou um pequeno rato falante chamado Ratão. Ratão convenceu o Carneiro a jogar um jogo de dados muito diferente, chamado Esbugalhado, valendo todo o queijo que ele tinha. Depois de perder todo o seu queijo, Carneiro ficou intrigado com o jogo e contratou você para programar uma aplicação web que implementasse o jogo.

## Regras do Jogo

O jogo segue as seguintes regras:

Cada jogador tem sua área de jogo dividida em três colunas, com três linhas cada, totalizando 9 casas.
O objetivo do jogo é ter uma soma de pontos maior que a do oponente ao final da partida, colocando dados nessas casas vazias.
Os jogadores se alternam, rolando um dado e colocando ele em suas áreas de jogo.
O total de pontos de cada jogador é dado basicamente pela soma dos valores dos dados, com a seguinte diferença: A soma da coluna é igual ao valor do dado, multiplicado pela quantidade de dados de mesmo valor nesta coluna. Por exemplo, uma coluna com 1-2-1 vale 1x2 + 2x1 + 1x2 = 6; uma com 1-1-1 = 1x3 + 1x3 + 1x3 = 9; um coluna com 6-6-3 vale 6x2 + 6x2 + 3x1 = 25.
Sempre que um jogador posicionar um dado em uma coluna, descarte todos os dados da coluna correspondente na área do oponente, que tenham um mesmo valor.
A partida é encerrada quando um jogador cobrir todas as 9 casas de sua área de jogo com dados.
Como jogar
Para jogar, o usuário deve clicar no botão "Rolar Dado" para gerar um valor aleatório de 1 a 6. Em seguida, o usuário deve clicar em uma das células vazias do seu tabuleiro para colocar o valor do dado. Os jogadores se alternam neste processo.

O jogo termina quando todas as células do tabuleiro de um dos jogadores estão preenchidas. O vencedor é o jogador com a maior pontuação, que é calculada com base nas regras descritas acima.

Depois que o jogo termina, o usuário pode clicar no botão "Jogar novamente" para iniciar uma nova partida.

## Implementação

O jogo é implementado usando JavaScript puro para a lógica do jogo, HTML para a estrutura da página e CSS para o estilo. A inteligência artificial do robô é bastante simples, escolhendo uma célula aleatória para preencher a cada turno. No entanto, a lógica poderia ser expandida para fazer o robô jogar de maneira mais estratégica.