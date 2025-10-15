"""kody_katas."""


class Grid:
    def __init__(self, grid):
        self.grid = grid

    def is_dead(self):
        for row in self.grid:
            for column in row:
                if column == 1:
                    return False

        return True
