package kata;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class FizzBuzzTest {

    @Test
    public void oneEqualsOne() {
        var output = new FizzBuzz().print(1);
        assertThat(output).isEqualTo("1");
    }
}
