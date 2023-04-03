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

    for k in range(len(input)):
        row = input[k]
        new_row = []

        for i in range(len(row)):
            cell = row[i]
            new_row.append(0)

        result.append(new_row)
    
    return result


class Test(TestCase):

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

