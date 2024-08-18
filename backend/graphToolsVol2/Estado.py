class Estado:
    def __init__(self, id, nome):
        self.id = id
        self.nome = nome
        self.nome_completo = ""
        self.latitude = 0
        self.longitude = 0
        self.x = 0
        self.y = 0
        self.descricao = ""
        self.filtros = []
        self.anterior = None
        self.custo = 0

    def visit(self, visitor):
        visitor.visit(self)

    def __lt__(self, other):
        return self.custo < other.custo

