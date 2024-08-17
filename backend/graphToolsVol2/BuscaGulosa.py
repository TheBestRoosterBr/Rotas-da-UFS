from backend.graphToolsVol2.Haversine import heuristica


class BuscaGulosa:
    def __init__(self):
        self.caminho = []
        self.custo = 0
        self.visitados = set()

    def busca(self, grafo, inicio, objetivo):
        self.caminho = []
        self.custo = 0
        self.visitados = set()

        atual = inicio
        self.caminho.append(atual)
        self.visitados.add(atual)

        while atual != objetivo:
            transicoes_validas = [t for t in grafo.transicoes if t.origem == atual and t.destino not in self.visitados]

            if not transicoes_validas:
                return None

            # Escolhe a transição com o menor valor heurístico (custo estimado até o objetivo)
            proxima_transicao = min(transicoes_validas, key=lambda t: heuristica(t.destino, objetivo))

            atual = proxima_transicao.destino
            self.caminho.append(atual)
            self.custo += float(proxima_transicao.distancia)
            self.visitados.add(atual)
        return self.caminho

    def ordem_expansao_nodos(self):
        return list(self.visitados)
