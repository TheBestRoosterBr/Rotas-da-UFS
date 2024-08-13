class BuscaEmLargura:
    def __init__(self):
        self.queue = []
        self.visitados = set()
        self.caminho = []

    def busca(self, grafo, inicio, fim):
        self.queue.append(inicio)
        self.visitados.add(inicio)
        pai = {inicio: None}

        while self.queue:
            estado_atual = self.queue.pop(0)

            if estado_atual == fim:
                self.caminho = []

                while estado_atual is not None:
                    self.caminho.append(estado_atual)
                    estado_atual = pai[estado_atual]

                self.caminho.reverse()
                return self.caminho

            for transicao in grafo.transicoes:
                if transicao.origem == estado_atual and transicao.destino not in self.visitados:
                    self.queue.append(transicao.destino)
                    self.visitados.add(transicao.destino)
                    pai[transicao.destino] = estado_atual
        return None
