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

def next_grid(input):
    
    result = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]


    return result



class Test(TestCase):
    def test_hello(self):
        assert 1 == 1

    def test_first(self):
        input = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]

        new_grid = next_grid(input)

        assert new_grid == input
    
    def test_loner(self):

        input = [
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]

        expected = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]

        new_grid = next_grid(input)
        
        assert new_grid == expected
