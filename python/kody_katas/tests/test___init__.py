from unittest import TestCase

from kody_katas import add


class Test(TestCase):

    def test_adds_1_and_1(self):
        self.assertEqual(2, add(1, 1))
