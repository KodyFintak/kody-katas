from unittest import TestCase


# https://codingdojo.org/kata/GameOfLife/

# first idea: check neighbors live or dead
# then make rules

# what type of matrix? nxn
# 1s and 0s
# 0 is dead
# 1 is alive

# z o m b i e s
# z => zero

#    1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
#    2. Any live cell with more than three live neighbours dies, as if by overcrowding.
#    3. Any live cell with two or three live neighbours lives on to the next generation.
#    4. Any dead cell with exactly three live neighbours becomes a live cell.

def next_grid(input):

    result = []

    for row_index in range(len(input)):
        row = input[row_index]
        new_row = []

        for i in range(len(row)):
            neighbors = []

            get_neighbors_below(i, input, row_index, neighbors, row)
            if i + 1 < len(row):
                neighbors.append(row[i + 1])

            number_of_live_neighbors = sum(neighbors)

            cell = row[i]

            if not cell and number_of_live_neighbors == 3:
                new_row.append(1)
            else:
                new_row.append(0)


        result.append(new_row)

    return result


def get_neighbors_below(i, input, row_index, neighbors, row):
    if row_index + 1 < len(row):
        if i - 1 >= 0:
            neighbors.append(input[row_index + 1][i - 1])

        neighbors.append(input[row_index + 1][i])

        if i + 1 < len(row):
            neighbors.append(input[row_index + 1][i + 1])


class Test(TestCase):

    def test_generate_life(self):
        value = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 0, 0]
        ]

        new_grid = next_grid(value)
        self.assertEqual(new_grid[0][0], 1)

    def test_first(self):
        value = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]

        new_grid = next_grid(value)
        self.assertEqual(new_grid, value)

    def test_loner(self):

        value = [
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]

        expected = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]

        new_grid = next_grid(value)

        self.assertEqual(new_grid, expected)

    def test_make_matrix_dead(self):

        value = [
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]

        expected = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]

        new_grid = next_grid(value)

        self.assertEqual(new_grid, expected)

