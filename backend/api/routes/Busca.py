from flask import Flask, request, jsonify
from flask.blueprints import Blueprint
from backend.graphToolsVol2.Reader import Reader
from backend.graphToolsVol2.BuscaAEstrela import BuscaAEstrela
from backend.graphToolsVol2.BuscaEmProfundidade import BuscaEmProfundidade
from backend.graphToolsVol2.BuscaEmLargura import BuscaEmLargura
from backend.graphToolsVol2.BuscaGulosa import BuscaGulosa

router = Blueprint('busca', __name__, url_prefix='/busca')

PATH_MAPA = '../Mapa/mapa.jff'
PATH_DATA = '../Mapa/custo.csv'


@router.route('/a_estrela', methods=['POST'])
def busca_a_estrela():
    data = request.json
    ini = data['inicio']
    f = data['fim']
    reader = Reader(PATH_MAPA, PATH_DATA)
    busca = BuscaAEstrela()
    estados = reader.estados
    inicio = next((estado for estado in estados if estado.id == ini), None)
    fim = next((estado for estado in estados if estado.id == f), None)
    busca.busca(reader.graph, inicio, fim)
    if busca.caminho is None or len(busca.caminho) == 0:
        return jsonify({"error": "Caminho não encontrado"}), 404
    return jsonify([estado.id for estado in busca.caminho]), 200


@router.route('/profundidade', methods=['POST'])
def busca_em_profundidade():
    data = request.json
    ini = data['inicio']
    f = data['fim']
    reader = Reader(PATH_MAPA, PATH_DATA)
    busca = BuscaEmProfundidade()
    estados = reader.estados
    inicio = next((estado for estado in estados if estado.id == ini), None)
    fim = next((estado for estado in estados if estado.id == f), None)
    busca.busca(reader.graph, inicio, fim)
    return jsonify([estado.id for estado in busca.caminho]), 200


@router.route('/largura', methods=['POST'])
def busca_em_largura():
    data = request.json
    ini = data['inicio']
    f = data['fim']
    reader = Reader(PATH_MAPA, PATH_DATA)
    busca = BuscaEmLargura()
    estados = reader.estados
    inicio = next((estado for estado in estados if estado.id == ini), None)
    fim = next((estado for estado in estados if estado.id == f), None)
    busca.busca(reader.graph, inicio, fim)
    return jsonify([estado.id for estado in busca.caminho]), 200


@router.route('/gulosa', methods=['POST'])
def busca_gulosa():
    data = request.json
    ini = data['inicio']
    f = data['fim']
    reader = Reader(PATH_MAPA, PATH_DATA)
    busca = BuscaGulosa()
    estados = reader.estados
    inicio = next((estado for estado in estados if estado.id == ini), None)
    fim = next((estado for estado in estados if estado.id == f), None)
    busca.busca(reader.graph, inicio, fim)
    return jsonify([estado.id for estado in busca.caminho]), 200
