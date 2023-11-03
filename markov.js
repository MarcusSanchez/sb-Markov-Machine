/** Textual markov chain generator */


export class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let map = new Map();

    for (let [idx, word] of this.words.entries()) {
      let next = this.words[idx + 1];

      if (map.has(word)) {
        map.get(word).push(next);
      } else {
        map.set(word, [next]);
      }
    }
    this.chain = map;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let out = [];
    let keys = Array.from(this.chain.keys());

    let random = Math.floor(Math.random() * keys.length);
    let key = keys[random];

    while (out.length < numWords && key) {
      out.push(key);
      random = Math.floor(Math.random() * this.chain.get(key).length);
      key = this.chain.get(key)[random];
    }

    return out.join(" ");
  }
}