import heapq

class BuscaCustoUniforme:
    def __init__(self):
        self.fronteira = []
        self.visitados = set()
        self.custo = 0
        self.caminho = []

    def busca(self, grafo, inicio, fim):
        heapq.heappush(self.fronteira, (0, inicio.nome, inicio, []))

        while self.fronteira:
            custo_atual, _, estado_atual, caminho_atual = heapq.heappop(self.fronteira)

            if estado_atual in self.visitados:
                continue

            self.visitados.add(estado_atual)
            caminho_atual = caminho_atual + [estado_atual]

            if estado_atual == fim:
                self.custo = custo_atual
                self.caminho = caminho_atual
                return custo_atual

            for transicao in grafo.transicoes:
                if transicao.origem == estado_atual:
                    novo_custo = custo_atual + transicao.distancia
                    heapq.heappush(self.fronteira, (novo_custo, transicao.destino.nome, transicao.destino, caminho_atual))

        self.custo = 0
        self.caminho = []
        return None
