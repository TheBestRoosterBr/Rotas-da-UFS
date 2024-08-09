import xml.etree.ElementTree as ET
from estado import *
from transicao import *
from grafo import *

class Reader:
    def __init__(self, pathFile):
        self.pathFile = pathFile
        self.graph = None
        self.estados = []
        self.transicoes = []
        self.read()
    

    def read(self):
        tree = ET.parse(self.pathFile)
        root = tree.getroot()
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
                        self.estados.append(Estado(id, name, x, y, label))
                    if state.tag == 'transition':
                        origem = state[0].text
                        destino = state[1].text
                        distancia = state[2].text
                        self.transicoes.append(Transicao(origem, destino, distancia))    
        self.graph = Grafo(self.estados, self.transicoes)
                    

    