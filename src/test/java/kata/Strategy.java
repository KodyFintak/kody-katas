package kata;

public interface Strategy {
    boolean isMatch(int input);
    String toString();
    FizzBuzzTest.Return toReturn();
}
