from unittest import TestCase

from kody_katas import Grid


# Pairing
# Driver/Typist - hands on keyboard. Focusing on how to take the words and turn them into code
# Navigator(s) - talking what we want to do high level. driver takes these instructions and turns them into code

# You start with a two dimensional grid of cells, where each cell is either alive or dead. In this version of the problem, the grid is finite, and no life can exist off the edges. When calcuating the next generation of the grid, follow these rules:
#
#    1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
#    2. Any live cell with more than three live neighbours dies, as if by overcrowding.
#    3. Any live cell with two or three live neighbours lives on to the next generation.
#    4. Any dead cell with exactly three live neighbours becomes a live cell.

class Test(TestCase):
    def test_grid_is_dead(self):
        grid = Grid([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ])
        self.assertTrue(grid.is_dead())
