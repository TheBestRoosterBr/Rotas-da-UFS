from Reader import Reader
from BuscaAEstrela import BuscaAEstrela


class GraphTool:
    def teste(self, nome_estado1, nome_estado2):
        reader = Reader("../../Mapa/mapa.jff")
        busca = BuscaAEstrela()
        estados = reader.graph.estados
        inicio = next((estado for estado in estados if estado.nome == nome_estado1), None)
        fim = next((estado for estado in estados if estado.nome == nome_estado2), None)
        busca.busca(reader.graph, inicio, fim)
        print("Custo: ", busca.custo)
        print("Caminho: ", [estado.nome for estado in busca.caminho])


if __name__ == '__main__':
    graph_tool = GraphTool()
    graph_tool.teste("xerox", "007d")
