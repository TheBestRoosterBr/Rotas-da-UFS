class Estado:
    def __init__(self, id, nome, custo, x, y):
        self.id = id
        self.nome = nome
        self.custo = custo
        self.x = x
        self.y = y
        self.anterior = None

    def visit(self, visitor):
        visitor.visit(self)

