import heapq


class BuscaCustoUniforme:
    def __init__(self):
        self.caminho = []
        self.visitados = set()
        self.queue = []  # Usaremos uma fila de prioridade
        self.pai = {}
        self.custo = {}

    def buscar(self, grafo, inicio, fim):
        # Inicializa o custo do nó inicial como 0 e adiciona-o na fila com prioridade 0
        self.custo[inicio] = 0
        heapq.heappush(self.queue, (0, inicio))

        while self.queue:
            _, atual = heapq.heappop(self.queue)  # Desenfileira o nó com menor custo acumulado

            if atual == fim:
                # Se chegamos ao objetivo, reconstruímos o caminho
                self.reconstruir_caminho(inicio, fim)
                return True

            if atual not in self.visitados:
                self.visitados.add(atual)

                # Explora os vizinhos do nó atual
                for transicao in grafo.transicoes:
                    if transicao.origem == atual:
                        vizinho = transicao.destino
                        novo_custo = self.custo[atual] + transicao.distancia

                        # Se o vizinho ainda não foi visitado ou se encontramos um caminho mais curto até ele
                        if vizinho not in self.custo or novo_custo < self.custo[vizinho]:
                            self.custo[vizinho] = novo_custo
                            self.pai[vizinho] = atual
                            heapq.heappush(self.queue, (novo_custo, vizinho))

        return False  # Não encontrou um caminho até o objetivo

    def reconstruir_caminho(self, inicio, fim):
        caminho = []
        atual = fim

        while atual != inicio:
            caminho.append(atual)
            atual = self.pai[atual]

        caminho.append(inicio)  # Adiciona o nó inicial ao caminho
        caminho.reverse()  # Inverte para ter o caminho do início ao fim
        self.caminho = caminho
