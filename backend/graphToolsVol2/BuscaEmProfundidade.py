class BuscaEmProfundidade:
    def __init__(self):
        self.visitados = set()
        self.caminho = []

    def busca(self, grafo, inicio, fim):
        self.visitados.add(inicio)
        self.caminho.append(inicio)

        if inicio == fim:
            return self.caminho

        for transicao in grafo.transicoes:
            if transicao.origem == inicio and transicao.destino not in self.visitados:
                resultado = self.busca(grafo, transicao.destino, fim)
                if resultado:
                    return resultado

        self.caminho.pop()
        return None
