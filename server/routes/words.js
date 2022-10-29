const router = require("express").Router();
const data = require("../TestData.json");

router.get("/", async (req, res) => {
  try {
    let words = data.wordList;

    // Make an array each for the parts of speech
    const allPos = (p) => words.filter((word) => word.pos === p);
    const nouns = allPos("noun");
    const verbs = allPos("verb");
    const adverbs = allPos("adverb");
    const adjectives = allPos("adjective");

    // Shuffling the words
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    shuffle(nouns);
    shuffle(verbs);
    shuffle(adverbs);
    shuffle(adjectives);

    let posGroups = [nouns, verbs, adverbs, adjectives];
    let posIndex = 0;
    let count = 0;
    let result = [];

    while (count++ < 10) {
      let word = posGroups[posIndex].pop();
      if (word) result.push(word);
      posIndex = posIndex < posGroups.length - 1 ? posIndex + 1 : 0;
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
