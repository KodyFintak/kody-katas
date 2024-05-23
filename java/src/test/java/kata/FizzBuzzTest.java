package kata;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class FizzBuzzTest {

    @Test
    public void shouldReturnString2ForInt2() {
        FizzBuzz fizzBuzz = new FizzBuzz();
        assertEquals("2", fizzBuzz.process(2));
    }

    @Test
    void shouldReturn1for1() {
        FizzBuzz fizzBuzz = new FizzBuzz();
        assertEquals("1",fizzBuzz.process(1));
    }

    @Test
    void shouldReturnFizzForInt3() {
        FizzBuzz fizzBuzz = new FizzBuzz();
        assertEquals("fizz",fizzBuzz.process(3));
    }

    @Test
    void shouldReturnFizzForInt6() {
        FizzBuzz fizzBuzz = new FizzBuzz();
        assertEquals("fizz",fizzBuzz.process(6));
    }

    @Test
    void shouldReturnBuzzForInt5() {
        FizzBuzz fizzBuzz = new FizzBuzz();
        assertEquals("buzz",fizzBuzz.process(5));
    }
}
