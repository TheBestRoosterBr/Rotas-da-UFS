from flask import Flask, request, jsonify
from flask.blueprints import Blueprint
from graphToolsVol2.Reader import Reader

router = Blueprint('Estados', __name__)

PATH_MAPA = '../Mapa/mapa.jff'
PATH_DATA = '../Mapa/custo.csv'


@router.route('/estado', methods=['GET'])
def get_estados():
    reader = Reader(PATH_MAPA, PATH_DATA)
    estados = reader.estados
    return jsonify([{'id': estado.id, 'nome': estado.nome, 'titulo': estado.nome_completo,
                     'x': estado.x, 'y': estado.y, 'imagem': estado.nome_completo + '.jpeg'} for estado in estados])


@router.route('/transicao', methods=['GET'])
def get_transicoes():
    reader = Reader(PATH_MAPA, PATH_DATA)
    transicoes = reader.transicoes
    return jsonify([{'origem': transicao.origem.id, 'destino': transicao.destino.id}
                    for transicao in transicoes])


@router.route('/estado/<int:id>', methods=['GET'])
def get_estado(id):
    reader = Reader(PATH_MAPA, PATH_DATA)
    estados = reader.estados
    estado = next((estado for estado in estados if estado.id == id), None)
    if estado is None:
        return jsonify({"error": "nao tem esse estado"}), 404
    return jsonify({'id': estado.id, 'nome': estado.nome, 'titulo': estado.nome_completo,
                    'descricao': estado.descricao, 'filtros': estado.filtros,
                    'x': estado.x, 'y': estado.y,
                    'imagem': estado.nome + ".jpeg"}), 200


@router.route('/filtro', methods=['GET'])
def get_filtros():
    reader = Reader(PATH_MAPA, PATH_DATA)
    filtros = reader.get_filtros()
    return jsonify(filtros)
