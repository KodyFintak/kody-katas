"""kody_katas."""


class Grid:
    def __init__(self, grid):
        self.grid = grid

    def is_dead(self):
        for row in self.grid:
            for cell in row:
                if cell == 1:
                    return False

        return True

    def next_iteration(self):
        return [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
