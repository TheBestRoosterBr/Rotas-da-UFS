# Rotas-da-UFS

O campus de Itabaiana da UFS possui diversos pontos de interesse como, bibliotecas, laboratórios, auditórios, secretarias de departamentos, sala de professores, areas de convivência,
cantinas, entradas e saídas, estacionamentos, entre outros

## Objetivo

Neste sentido o objetivo principal é dado um ponto de partida encontrar o melhor caminho para um ponto de interesse desejado.

## Metodologia

Para atingir o objetivo proposto, foram utilizados diversos algoritmos de busca como A*, busca em largura, busca em profundidade, custo uniforme e gulosa pela melhor escolha.

O grafo foi construído usando medidas reais que transcrevem a experiência real de um estudante que deseja se locomover no campus de Itabaiana da UFS.

![img.png](img.png)

## Execução
O primeiro passo é instalar as dependências "de linguages", como o projeto foi desenvolvido em python e ~~Java~~Typescript

* Node.js - [Como instalar?](https://letmegooglethat.com/?q=install%20node%20js%20on%20windows&l=1)
* Python & Pip - [Como instalar?](https://letmegooglethat.com/?q=Install%20python%20on%20windows&l=1)

Não sabemos ao certo a versão mínima de cada ferramenta então se tiver problemas baixe a versão mais recente disponível.
Feito a instalação da ferramentas básicas das linguages (seus interpretadores) segue os passos para execução:

### Back-end
Supondo que o diretório atual é `/caminho/do/projeto/backend/` execute:

    $ pip install -r requirements.txt
    $ python server.py

### Front-end
Supondo que o diretório atual é `/caminho/do/projeto/frontend/` execute:

    $ npm install
    $ npm run start:dev

Obviamente cada parte do projeto (back-end e front-end) deve estar em execução para o devido funcionamento. A ordem importa, para evitar frustações com o front-end execute primeiro o back-end.

Não temos executável e não teremos, boa sorte!
