package kata;

public class FizzBuzz {

    public String print(int number) {
        if (number % 3 == 0) return "Fizz";
        return String.valueOf(number);
    }
}
