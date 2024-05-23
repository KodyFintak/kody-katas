package kata;

public class FizzBuzz {
    public String process(int input) {
        if (input == 5) return "buzz";
        if (input % 3 == 0) return "fizz";
        return String.valueOf(input);
    }
}
