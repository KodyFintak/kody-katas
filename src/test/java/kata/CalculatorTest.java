package kata;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {

    @Test
    public void shouldAdd() {
        assertEquals(4, Calculator.add(2, 2));
    }
}
