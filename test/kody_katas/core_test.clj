(ns kody-katas.core-test
  (:require [clojure.test :refer :all]
            [kody-katas.core :refer :all]))

(deftest add-numbers-test
  (testing "should add numbers"
    (is (= 4 (add-numbers 2 2)))))
