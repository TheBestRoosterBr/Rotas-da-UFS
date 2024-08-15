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


@router.route('/get_estados', methods=['GET'])
def get_estados():
    reader = Reader(PATH_MAPA, PATH_DATA)
    estados = reader.estados
    return jsonify({'estados': [{'id': estado.id, 'nome': estado.nome_completo} for estado in estados]})


@router.route('/get_transicoes', methods=['GET'])
def get_transicoes():
    reader = Reader(PATH_MAPA, )
    transicoes = reader.transicoes
    return jsonify({'transicoes': [{'origem': transicao.origem.id, 'destino': transicao.destino.id,
                                    'distancia': transicao.distancia} for transicao in transicoes]})


@router.route('/get_estado', methods=['GET'])
def get_estado():
    id = request.args.get('id')
    reader = Reader(PATH_MAPA, PATH_DATA)
    estados = reader.estados
    estado = next((estado for estado in estados if estado.id == id), None)
    if estado is None:
        return jsonify(404, "nao tem esse estado")
    return jsonify({'estado': {'id': estado.id, 'nome': estado.nome_completo,
                               'descricao': estado.descricao, 'filtros': estado.filtros,
                               'latitude': estado.latitude, 'longitude': estado.longitude,
                               'image_path': "../imagens/" + estado.nome + ".png"}})


@router.route('/busca_a_estrela', methods=['POST'])
def busca_a_estrela():
    data = request.json
    inicio = data['inicio']
    fim = data['fim']
    reader = Reader(PATH_MAPA, PATH_DATA)
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
    reader = Reader(PATH_MAPA, PATH_DATA)
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
    reader = Reader(PATH_MAPA, PATH_DATA)
    busca = BuscaEmLargura()
    estados = reader.estados
    inicio = next((estado for estado in estados if estado.id == inicio), None)
    fim = next((estado for estado in estados if estado.id == fim), None)
    busca.busca(reader.graph, inicio, fim)
    return jsonify({'caminho': [estado.id for estado in busca.caminho]},
                   {'ordem_expansao': [estado.id for estado in busca.ordem_expansao_nodos()]})


@router.route('/busca_gulosa', methods=['POST'])
def busca_gulosa():
    data = request.json
    inicio = data['inicio']
    fim = data['fim']
    reader = Reader(PATH_MAPA, PATH_DATA)
    busca = BuscaGulosa()
    estados = reader.estados
    inicio = next((estado for estado in estados if estado.id == inicio), None)
    fim = next((estado for estado in estados if estado.id == fim), None)
    busca.busca(reader.graph, inicio, fim)
    return jsonify({'caminho': [estado.id for estado in busca.caminho]},
                   {'custo': busca.custo},
                   {'ordem_expansao': [estado.id for estado in busca.ordem_expansao_nodos()]})
