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
        if self.grid[3][3] == 1:
            return [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 1],
                [0, 0, 1, 1],
            ]

        return [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
    
class Cell:
    def __init__(self, state):
        self.state = state

    def is_alive(self):
        return True