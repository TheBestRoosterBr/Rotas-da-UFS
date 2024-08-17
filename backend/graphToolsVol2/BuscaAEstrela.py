from backend.graphToolsVol2.Haversine import heuristica


class BuscaAEstrela:
    def __init__(self):
        self.fronteira = []
        self.visitados = []
        self.caminho = []
        self.achou = False
        self.custo = 0

    def busca(self, grafo, inicio, fim):  # deve retornar o caminho entre o inicio e o fim no grafo
        self.fronteira.append(inicio)
        inicio.custo = 0
        while len(self.fronteira) > 0:
            self.fronteira.sort(key=lambda x: x.custo)
            estado = self.fronteira.pop(0)
            self.visitados.append(estado)
            if estado == fim:
                self.achou = True
                break
            for transicao in grafo.transicoes:
                if transicao.origem == estado:
                    if transicao.destino not in self.visitados:
                        if transicao.destino not in self.fronteira:
                            self.fronteira.append(transicao.destino)
                            transicao.destino.anterior = estado
                            transicao.destino.custo = estado.custo + heuristica(transicao.destino, estado)
                        else:
                            if transicao.destino.custo > estado.custo + heuristica(transicao.destino, estado):
                                transicao.destino.anterior = estado
                                transicao.destino.custo = estado.custo + heuristica(transicao.destino, estado)
        if self.achou:
            self.caminho.append(fim)
            anterior = fim.anterior
            while anterior is not None:
                self.caminho.append(anterior)
                anterior = anterior.anterior
            self.caminho.reverse()
            self.custo = fim.custo

    def ordem_expansao_nodos(self):
        return self.visitados
