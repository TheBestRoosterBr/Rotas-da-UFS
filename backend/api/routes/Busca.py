from flask import Flask, request, jsonify
from flask.blueprints import Blueprint

from backend.graphToolsVol2.Reader import Reader
from backend.graphToolsVol2.BuscaAEstrela import BuscaAEstrela
from backend.graphToolsVol2.BuscaEmProfundidade import BuscaEmProfundidade
from backend.graphToolsVol2.BuscaEmLargura import BuscaEmLargura


router = Blueprint('busca', __name__, url_prefix='/busca')

PATH_MAPA = '../Mapa/mapa.jff'


@router.route('/get_estados', methods=['GET'])
def get_estados():
    reader = Reader(PATH_MAPA)
    estados = reader.estados
    return jsonify({'estados': [{'id': estado.id, 'nome': estado.nome} for estado in estados]})


@router.route('/busca_a_estrela', methods=['POST'])
def busca_a_estrela():
    data = request.json
    inicio = data['inicio']
    fim = data['fim']
    reader = Reader(PATH_MAPA)
    busca = BuscaAEstrela()
    estados = reader.estados
    inicio = next((estado for estado in estados if estado.id == inicio), None)
    fim = next((estado for estado in estados if estado.id == fim), None)
    busca.busca(reader.graph, inicio, fim)
    return jsonify({'caminho': [estado.id for estado in busca.caminho]}, {'custo': busca.custo},
                   {'ordem_expansao': [estado.id for estado in busca.ordem_expansao_nodos()]})


@router.route('/busca_em_profundidade', methods=['POST'])
def busca_em_profundidade():
    data = request.json
    inicio = data['inicio']
    fim = data['fim']
    reader = Reader(PATH_MAPA)
    busca = BuscaEmProfundidade()
    estados = reader.estados
    inicio = next((estado for estado in estados if estado.id == inicio), None)
    fim = next((estado for estado in estados if estado.id == fim), None)
    busca.busca(reader.graph, inicio, fim)
    return jsonify({'caminho': [estado.id for estado in busca.caminho]},
                   {'ordem_expansao': [estado.id for estado in busca.ordem_expansao_nodos()]})


@router.route('/busca_em_largura', methods=['POST'])
def busca_em_largura():
    data = request.json
    inicio = data['inicio']
    fim = data['fim']
    reader = Reader(PATH_MAPA)
    busca = BuscaEmLargura()
    estados = reader.estados
    inicio = next((estado for estado in estados if estado.id == inicio), None)
    fim = next((estado for estado in estados if estado.id == fim), None)
    busca.busca(reader.graph, inicio, fim)
    return jsonify({'caminho': [estado.id for estado in busca.caminho]},
                   {'ordem_expansao': [estado.id for estado in busca.ordem_expansao_nodos()]})
