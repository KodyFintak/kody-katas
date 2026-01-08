"""kody_katas."""
from typing import Any


class Grid:
    def __init__(self, grid):
        self.grid = grid

    def count_live_neighbours_for_cell(self, y, x):
        count = 0

        for coords in self.get_neighbour_coordinates(y, x):
            if self.is_cell_alive(coords[0], coords[1]):
                count += 1

        return count

    def get_neighbour_coordinates(self, y, x):
        return [
            (y - 1, x - 1),
            (y - 1, x),
            (y - 1, x + 1),
            (y, x - 1),
            (y, x + 1),
            (y + 1, x - 1),
            (y + 1, x),
            (y + 1, x + 1)
        ]

    def is_in_bounds(self, y, x):
        return (0 <= y < len(self.grid)) and (0 <= x < len(self.grid[y]))

    def is_cell_alive(self, y, x):
        if not self.is_in_bounds(y, x):
            return False

        return self.grid[y][x] == 1

    def is_dead(self):
        for row in self.grid:
            for cell in row:
                if cell == 1:
                    return False

        return True

    def next_iteration(self):
        new_grid = []

        for y in range (len(self.grid)):
            row = self.grid[y]
            new_grid.append([])
            for x in range (len(row)):
                cell = Cell(self.grid[y][x])
                live_neighbours = self.count_live_neighbours_for_cell(y, x)
                new_cell = cell.next_iteration(live_neighbours)
                new_grid[y].append(1 if new_cell.is_alive() else 0)
        return new_grid 

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
    