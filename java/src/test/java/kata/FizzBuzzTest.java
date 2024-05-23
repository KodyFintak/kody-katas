package kata;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class FizzBuzzTest {

    @Test
    public void shouldProcess() {
        FizzBuzz fizzBuzz = new FizzBuzz();
        assertEquals("2", fizzBuzz.process(2));
    }

    @Test
    void shouldReturn1for1() {
        FizzBuzz fizzBuzz = new FizzBuzz();
        assertEquals("1",fizzBuzz.process(1));
    }
}
