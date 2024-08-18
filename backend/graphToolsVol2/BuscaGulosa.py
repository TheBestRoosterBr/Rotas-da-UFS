from graphToolsVol2.Haversine import heuristica


class BuscaGulosa:
    def __init__(self):
        self.caminho = []
        self.custo = 0
        self.visitados = set()

    def busca(self, grafo, inicio, objetivo):
        self.caminho = []
        self.custo = 0
        self.visitados = set()

        def fds(atual):
            if atual not in self.visitados:
                self.visitados.add(atual)
                self.caminho.append(atual)

                if atual == objetivo:
                    return True

                vizinhos = [t for t in grafo.transicoes if t.origem == atual]
                vizinhos.sort(key=lambda t: heuristica(t.destino, objetivo))

                for v in vizinhos:
                    if v not in self.visitados and fds(v.destino):
                        return True
                self.caminho.pop()
                return False

        fds(inicio)
        return self.caminho

    def ordem_expansao_nodos(self):
        return list(self.visitados)
