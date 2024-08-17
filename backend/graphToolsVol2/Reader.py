import xml.etree.ElementTree as ET
from backend.graphToolsVol2.Estado import Estado
from backend.graphToolsVol2.Grafo import Grafo
from backend.graphToolsVol2.Transicao import Transicao
import pandas as pd


class Reader:
    def __init__(self, path_mapa, path_data):
        self.pathMapa = path_mapa
        self.pathData = path_data
        self.graph = None
        self.estados = []
        self.transicoes = []
        self.read()

    def read(self):
        tree = ET.parse(self.pathMapa)
        root = tree.getroot()

        # Dicionário para mapear IDs de estados para objetos Estado
        id_to_estado = {}

        for child in root:
            if child.tag == 'automaton':
                for state in child:
                    if state.tag == 'state':
                        id = state.attrib['id']
                        name = state.attrib['name']
                        estado = Estado(id, name)
                        self.estados.append(estado)
                        # Adiciona o objeto Estado ao mapeamento pelo seu ID
                        id_to_estado[id] = estado

                    if state.tag == 'transition':
                        # Usa o mapeamento para obter os objetos Estado completos pelos IDs
                        origem = id_to_estado[state[0].text]
                        destino = id_to_estado[state[1].text]
                        distancia = state[2].text
                        self.transicoes.append(Transicao(origem, destino, distancia))
        df = pd.read_csv(self.pathData)
        # id, LUGAR,Latitude,Longitude,Descricao,Tags
        # 12, Entrada da vivenvcia ,"-10,6817430","-37,4364287"
        for index, row in df.iterrows():
            id = row['id']
            name = row['LUGAR']
            descricao = row['Descricao']
            tags = row['Tags']
            latitude = row['Latitude']
            longitude = row['Longitude']
            estado = next((estado for estado in self.estados if estado.id == str(id)), None)
            if estado is not None:
                estado.nome_completo = name
                estado.descricao = descricao
                estado.filtros = tags
                estado.latitude = latitude
                estado.longitude = longitude
        self.graph = Grafo(self.estados, self.transicoes)
