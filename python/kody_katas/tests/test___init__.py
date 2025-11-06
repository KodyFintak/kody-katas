from unittest import TestCase

from kody_katas import Grid, Cell

# Pairing
# Driver/Typist - hands on keyboard. Focusing on how to take the words and turn them into code
# Navigator(s) - talking what we want to do high level. driver takes these instructions and turns them into code

# You start with a two dimensional grid of cells, where each cell is either alive or dead. In this version of the problem, the grid is finite, and no life can exist off the edges. When calcuating the next generation of the grid, follow these rules:
#
#    1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
#    2. Any live cell with more than three live neighbours dies, as if by overcrowding.
#    3. Any live cell with two or three live neighbours lives on to the next generation.
#    4. Any dead cell with exactly three live neighbours becomes a live cell.


# ternary
# boolean expression ? (run if true) : (run if false)
# e.g. 4 == 2 ? log('hi') : log('bye') // prints bye

class Test(TestCase):
    def test_grid_is_dead(self):
        grid = Grid([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ])
        self.assertTrue(grid.is_dead())

    def test_grid_is_not_dead(self):
        grid = Grid([
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ])
        self.assertFalse(grid.is_dead())

    def test_next_iteration_is_dead(self):
        grid = Grid([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ])
        expected_grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
        self.assertEqual(expected_grid, grid.next_iteration())

    def test_underpopulated_cell_dies(self):
        grid = Grid([
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ])
        expected_grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
        self.assertEqual(expected_grid, grid.next_iteration())

    #    3. Any live cell with two or three live neighbours lives on to the next generation.
    def test_properly_populated_cell_lives_on(self):
        grid = Grid([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 1],
        ])
        expected_grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 1],
        ]
        self.assertEqual(expected_grid, grid.next_iteration())

    def test_cell_is_alive(self):
        cell = Cell(1)
        self.assertTrue(cell.is_alive())

    def test_cell_is_dead(self):
        cell = Cell(0)
        self.assertFalse(cell.is_alive())

    # 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    def test_cell_with_no_live_neighbors_dies(self):
        cell = Cell(1)
        dead_cell = cell.next_iteration()
        self.assertFalse(dead_cell.is_alive())