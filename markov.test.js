const { MarkovMachine } = require("./markov");

describe("Testing Markov Machine", function () {
  let mm;

  beforeEach(function () {
    mm = new MarkovMachine("one two three");
  });

  test("Testing chain structure", function () {
    const testedChains = {
      one: ["two"],
      two: ["three"],
      three: [null],
    };
    expect(mm.chains).toEqual(testedChains);
  });

  test("Testing text generation length", function () {
    const testText = mm.makeText(10);
    const testWords = testText.split(" ");
    expect(testWords.length).toBeLessThanOrEqual(10);
  });

  test("Testing an empty input", function () {
    const xx = new MarkovMachine("");
    const testText = xx.makeText(10);
    expect(testText).toBe(" ");
  });
});
