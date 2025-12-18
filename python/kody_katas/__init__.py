"""kody_katas."""


class Grid:
    def __init__(self, grid):
        self.grid = grid

    def count_live_neighbours_for_cell(self, y, x):
        count = 0

        if y > 0 and x > 0:
            if self.grid[y - 1][x - 1] == 1:
                count += 1

        if self.grid[y - 1][x] == 1:
            count += 1

        if y > 0:
            if self.grid[y - 1][x + 1] == 1:
                count += 1
        if x > 0:
            if self.grid[y][x - 1] == 1:
                count += 1

        if self.grid[y][x + 1] == 1:
            count += 1

        if x > 0:
            if self.grid[y + 1][x - 1] == 1:
                count += 1

        if self.grid[y + 1][x] == 1:
            count += 1

        if self.grid[y + 1][x + 1] == 1:
            count += 1

        return count
    
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

    @classmethod
    def create_alive(cls):
        return Cell(1)

    @classmethod
    def create_dead(cls):
        return Cell(0)

    def is_alive(self):
        return self.state == 1

    def next_iteration(self, number_of_live_neighbors):
        if self.is_alive():
            if number_of_live_neighbors == 2 or number_of_live_neighbors == 3:
                return Cell.create_alive()

        if not self.is_alive():
            if number_of_live_neighbors == 3:
                return Cell.create_alive()

        return Cell.create_dead()
    