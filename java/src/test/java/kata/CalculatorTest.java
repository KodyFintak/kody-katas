package kata;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {

    @Test
    public void shouldAdd() {
        assertThat(Calculator.add(2, 2)).isEqualTo(4);
    }
}
