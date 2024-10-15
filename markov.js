/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {}; // make an empty object to hold our chains

    for (let i = 0; i < this.words.length - 1; i++) {
      //Loop over the words (except the last one) ...
      let word = this.words[i];
      let nextWord = this.words[i + 1];

      if (!(word in this.chains)) {
        //If the word is not already a key, make it an empty array and...
        this.chains[word] = [];
      }
      this.chains[word].push(nextWord); //...add the next word into the array
    }
    //make the last word array contain null
    let lastWord = this.words[this.words.length - 1];
    if (!this.chains[lastWord]) {
      this.chains[lastWord] = [];
    }
    this.chains[lastWord].push(null);
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    //Create an empty array, choose a random starting word from the words given, and push that into the result array
    let result = [];
    let currentWord = this.words[Math.floor(Math.random() * this.words.length)];
    result.push(currentWord);

    for (let i = 0; i < numWords - 1; i++) {
      let nextWords = this.chains[currentWord];
      //If there are no next words, end the sentence
      if (!nextWords || nextWords.length === 0) break;
      if (currentWord === null) break;

      //If there are next words, choose one at random and add it to the sentence
      currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
      result.push(currentWord);
    }
    return result.join(" "); //Join the result into a string, separated by a space
  }
}

module.exports = { markovMachine: MarkovMachine };
