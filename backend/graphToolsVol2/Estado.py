class Estado:
    def __init__(self, id, nome):
        self.id = id
        self.nome = nome
        self.nome_completo = ""
        self.latitude = 0
        self.longitude = 0
        self.descricao = ""
        self.filtros = []
        self.anterior = None

    def visit(self, visitor):
        visitor.visit(self)
