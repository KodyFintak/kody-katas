<?php

use PHPUnit\Framework\TestCase;

require_once 'Example.php';

class ExampleTest extends TestCase
{
    public function testAdds1And2() {
        $example = new Example();
        $this->assertThat($example->add(1, 1), $this->equalTo(3));
    }
}
