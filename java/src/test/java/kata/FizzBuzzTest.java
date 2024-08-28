package kata;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class FizzBuzzTest {

    @ParameterizedTest
    @CsvSource({"1, 1", "2, 2"})
    public void fizzBuzz(int input, String output) {
        assertThat(new FizzBuzz().print(input)).isEqualTo(output);
    }

}
