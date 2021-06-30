using KodyKata;
using Xunit;

namespace KodyKataTests
{
    public class CalculatorTests
    {
        [Fact]
        public void ShouldAddSomeNumbers()
        {
            Calculator calculator = new Calculator();
            Assert.Equal(2, calculator.Add(1, 1));
        }
    }
}