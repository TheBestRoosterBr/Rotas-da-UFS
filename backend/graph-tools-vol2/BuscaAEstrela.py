class BuscaAEstrela:
    def __init__(self):
        self.fronteira = []
        self.visitados = []
        self.caminho = []
        self.achou = False
        self.custo = 0

    def busca(self, grafo, inicio, fim):
        self.fronteira.append(inicio)
        self.visitados.append(inicio)

        while len(self.fronteira) > 0:
            self.fronteira = sorted(self.fronteira, key=lambda estado: estado.custo)
            estado_atual = self.fronteira.pop(0)

            if estado_atual == fim:
                self.achou = True
                break

            for transicao in grafo.transicoes:
                if transicao.origem == estado_atual:
                    custo = estado_atual.custo + transicao.distancia
                    if transicao.destino not in self.visitados:
                        transicao.destino.custo = custo
                        self.fronteira.append(transicao.destino)
                        self.visitados.append(transicao.destino)
                        transicao.destino.anterior = estado_atual
                    else:
                        if custo < transicao.destino.custo:
                            transicao.destino.custo = custo
                            transicao.destino.anterior = estado_atual

        if self.achou:
            self.caminho.append(fim)
            while fim.anterior is not None:
                self.caminho.append(fim.anterior)
                fim = fim.anterior
            self.caminho.reverse()
            self.custo = self.caminho[-1].custo
            return self.caminho
        else:
            return None