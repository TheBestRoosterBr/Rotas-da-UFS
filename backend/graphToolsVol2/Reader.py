import xml.etree.ElementTree as ET
from graphToolsVol2.Estado import Estado
from graphToolsVol2.Grafo import Grafo
from graphToolsVol2.Transicao import Transicao
import pandas as pd


def conversor(original_string):
    original_string = original_string.replace(",", ".")
    return float(original_string)


class Reader:
    def __init__(self, path_mapa, path_data):
        self.pathMapa = path_mapa
        self.pathData = path_data
        self.graph = None
        self.estados = []
        self.transicoes = []
        self.read()

    def get_filtros(self):
        filtros = []
        for estado in self.estados:
            for filtro in estado.filtros:
                if filtro not in filtros:
                    filtros.append(filtro)
        return filtros

    def read(self):
        tree = ET.parse(self.pathMapa)
        root = tree.getroot()

        # Dicionário para mapear IDs de estados para objetos Estado
        id_to_estado = {}

        for child in root:
            if child.tag == 'automaton':
                for state in child:
                    if state.tag == 'state':
                        id = int(state.attrib['id'])
                        name = state.attrib['name']
                        x = 0
                        y = 0
                        for position in state:
                            if position.tag == 'x':
                                x = position.text
                            if position.tag == 'y':
                                y = position.text
                        estado = Estado(id, name)
                        estado.x = conversor(x)
                        estado.y = conversor(y)
                        self.estados.append(estado)
                        # Adiciona o objeto Estado ao mapeamento pelo seu ID
                        id_to_estado[id] = estado

                    if state.tag == 'transition':
                        # Usa o mapeamento para obter os objetos Estado completos pelos IDs
                        origem = id_to_estado[int(state[0].text)]
                        destino = id_to_estado[int(state[1].text)]
                        distancia_s = state[2].text
                        distancia = conversor(distancia_s)
                        self.transicoes.append(Transicao(origem, destino, distancia))
        df = pd.read_csv(self.pathData)
        # paraid,LUGAR,Latitude,Longitude,Descricao,Tags
        # 12, Entrada da vivenvcia ,"-10,6817430","-37,4364287"
        for index, row in df.iterrows():
            id = int(row['paraid'])
            name = row['LUGAR']
            descricao = row['Descricao']
            tags = row['Tags']
            latitude = row['Latitude']
            longitude = row['Longitude']
            estado = next((estado for estado in self.estados if estado.id == id), None)
            if estado is not None:
                estado.nome_completo = name
                estado.descricao = descricao
                filtros = tags.split(",")
                for filtro in filtros:
                    filtro = filtro.strip()
                    if filtro != "":
                        estado.filtros.append(filtro)
                estado.latitude = conversor(latitude)
                estado.longitude = conversor(longitude)
        self.graph = Grafo(self.estados, self.transicoes)
