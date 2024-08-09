class Estado:
    def __init__(self, id, nome, label, x, y):
        self.id = id
        self.name = nome
        self.label = label
        self.x = x
        self.y = y

    def visit(self, visitor):
        visitor.visit(self)

