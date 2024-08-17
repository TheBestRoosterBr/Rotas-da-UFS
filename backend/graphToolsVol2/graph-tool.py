from BuscaAEstrela import BuscaAEstrela
from BuscaGulosa import BuscaGulosa
from Reader import Reader


class GraphTool:
    def teste(self, nome_estado1, nome_estado2):
        reader = Reader("../../Mapa/mapa.jff", "../../Mapa/custo.csv")
        busca = BuscaAEstrela()
        #busca = BuscaGulosa()
        estados = reader.graph.estados
        inicio = next((estado for estado in estados if estado.id == nome_estado1), None)
        fim = next((estado for estado in estados if estado.id == nome_estado2), None)
        busca.busca(reader.graph, inicio, fim)
        print("Custo: ", busca.custo)
        print("Caminho: ", [estado.nome for estado in busca.caminho])


if __name__ == '__main__':
    graph_tool = GraphTool()
    graph_tool.teste(1, 69)
