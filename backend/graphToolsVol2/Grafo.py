class Grafo:
    def __init__(self, estados=None, transicoes=None):
        if estados is None:
            estados = []
        self.estados = estados
        if transicoes is None:
            transicoes = []
        self.transicoes = transicoes
