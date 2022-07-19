package kata;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class FizzBuzzTest {

    @Nested
    class StringOfNumber {
        @Test
        public void intOfOneReturnsStringOne() {
            // arrange.
            int input = 1;

            // act.
            String result = calculateFizzBuzz(input);

            // assert
            assertEquals("1", result);
        }

        @Test
        public void returnsStringOfGivenInt() {
            // arrange.
            int input = 2;

            // act.
            String result = calculateFizzBuzz(input);

            // assert
            assertEquals("2", result);
        }
    }

    @Nested
    class Fizz {
        @Test
        public void returnsFizzForInt3() {
            // arrange.
            int input = 3;

            // act.
            String result = calculateFizzBuzz(input);

            // assert
            assertEquals("fizz", result);
        }

        @Test
        public void returnsFizzForAnyMultipleOf3() {
            // arrange.
            int input = 6;

            // act.
            String result = calculateFizzBuzz(input);

            // assert
            assertEquals("fizz", result);
        }

    }

    @Nested
    class Buzz {
        @Test
        public void returnsBuzzForInt5() {
            // arrange.
            int input = 5;

            // act.
            String result = calculateFizzBuzz(input);

            // assert
            assertEquals("buzz", result);
        }

        @Test
        public void returnsBuzzForAnyMultipleOf5() {
            // arrange.
            int input = 10;

            // act.
            String result = calculateFizzBuzz(input);

            // assert
            assertEquals("buzz", result);
        }
    }


    @Nested
    class FizzBuzz {
        @Test
        public void returnsFizzBuzzForInt15() {
            // arrange.
            int input = 15;

            // act.
            String result = calculateFizzBuzz(input);

            // assert
            assertEquals("fizzbuzz", result);
        }

        @Test
        public void returnsFizzBuzzForAnyMultipleOf3And5() {
            // arrange.
            int input = 30;

            // act.
            String result = calculateFizzBuzz(input);

            // assert
            assertEquals("fizzbuzz", result);
        }
    }

    private String calculateFizzBuzz(int input) {
        return createChain().evaluate(input).toString();
    }

    private ChainLinkMod createChain() {
        return new ChainLinkMod(new FizzBuzzStrategy(),
                new ChainLinkMod(new BuzzStrategy(),
                        new ChainLinkMod(new FizzStrategy(),
                                new ChainLinkString())));
    }

    class ChainLinkMod implements ChainLink {
        private Strategy strategy;
        private ChainLink nextLink;

        public ChainLinkMod(Strategy strategy, ChainLink nextLink) {
            this.strategy = strategy;
            this.nextLink = nextLink;
        }

        public Return evaluate(int input) {
            return strategy.isMatch(input) ? strategy.toReturn() : nextLink.evaluate(input);
        }
    }

    class Return {
        private String value;

        public Return(String value) {
            this.value = value;
        }

        public String toString() {
            return value;
        }
    }

    class ChainLinkString implements ChainLink {
        public Return evaluate(int input) {
            return new Return(String.valueOf(input));
        }
    }

    class FizzStrategy implements Strategy {
        public boolean isMatch(int input) {
            return input % 3 == 0;
        }

        public Return toReturn() {
            return new Return("fizz");
        }
    }

    class BuzzStrategy implements Strategy {
        public boolean isMatch(int input) {
            return input % 5 == 0;
        }

        public Return toReturn() {
            return new Return("buzz");
        }
    }

    class FizzBuzzStrategy implements Strategy {
        public boolean isMatch(int input) {
            return input % 15 == 0;
        }

        public Return toReturn() {
            return new Return("fizzbuzz");
        }
    }

//    private String og(int input) {
//        if (input % 15 == 0) {
//            return "fizzbuzz";
//        }
//
//        if (input % 5 == 0) {
//            return "buzz";
//        }
//
//        if (input % 3 == 0) {
//            return "fizz";
//        }
//
//        return String.valueOf(input);
//    }
}
