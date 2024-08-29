package kata;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class FizzBuzzTest {

    @Test
    public void oneGetsOne() {
        assertThat(new FizzBuzz().print(1)).isEqualTo("1");
    }

    @Test
    public void twoGetsTwo() {
        assertThat(new FizzBuzz().print(2)).isEqualTo("2");
    }
}
