import xml.etree.ElementTree as ET
from Estado import *
from Transicao import *
from Grafo import *


class Reader:
    def __init__(self, path_file):
        self.pathFile = path_file
        self.graph = None
        self.estados = []
        self.transicoes = []
        self.read()

    def read(self):
        tree = ET.parse(self.pathFile)
        root = tree.getroot()

        # Dicionário para mapear IDs de estados para objetos Estado
        id_to_estado = {}

        for child in root:
            if child.tag == 'automaton':
                for state in child:
                    if state.tag == 'state':
                        id = state.attrib['id']
                        name = state.attrib['name']
                        x = 0
                        y = 0
                        label = ""
                        for position in state:
                            if position.tag == 'x':
                                x = position.text
                            if position.tag == 'y':
                                y = position.text
                            if position.tag == 'label':
                                label = position.text
                        estado = Estado(id, name, x, y, label)
                        self.estados.append(estado)

                        # Adiciona o objeto Estado ao mapeamento pelo seu ID
                        id_to_estado[id] = estado

                    if state.tag == 'transition':
                        # Usa o mapeamento para obter os objetos Estado completos pelos IDs
                        origem = id_to_estado[state[0].text]
                        destino = id_to_estado[state[1].text]
                        distancia = state[2].text
                        self.transicoes.append(Transicao(origem, destino, distancia))

        self.graph = Grafo(self.estados, self.transicoes)