# ESO Helpful Scripts
These bits of JavaScript have been created to help East Shore Online
teachers as they build interactive Storyline activities.

> **Technical note:**
each function has been declared as an anonymous function saved to a variable to avoid function definition collisions depending on how the Storyline player handles user-provided JavaScript.

## Count Words
```javascript
var countWords = function(text) {
    return text.trim().replace(/\s{2,}/g, ' ').split(' ').length;
}
```

This function returns the total number of words from some text.

Example usage:
```javascript
var player = GetPlayer();
var countWords = function(text) {
    return text.trim().replace(/\s{2,}/g, ' ').split(' ').length;
}
var text = player.GetVar("TextEntry");
player.SetVar("numWords", countWords(text));
```

## Count Specific Words

```javascript
var countWordsFoundInText = function(text, wordsToFind) {
    var processed = text.trim().replace(/\s{2,}/g, ' ').toLowerCase();
    return wordsToFind.reduce(function (total, word) {
        return total + (processed.indexOf(word.toLowerCase()) >= 0 ? 1 : 0);
    }, 0);
}
```

This function counts how many specific words are found in some text.
For example, in an English lesson about nouns, you could check whether
the student used words like person, place, thing, or idea in their text
response.

Partial matches are counted.
Each word is only counted once, so if they wrote: "A noun is a thing like ideas or things." then they would get 2 points (the word `thing` is only counted once).

Example usage:
```javascript
var player = GetPlayer();
var countWordsFoundInText = function(text, wordsToFind) {
    var processed = text.trim().replace(/\s{2,}/g, ' ').toLowerCase();
    return wordsToFind.reduce(function (total, word) {
        return total + (processed.indexOf(word.toLowerCase()) >= 0 ? 1 : 0);
    }, 0)
}
var wordsToFind = ["increase", 'more', 'Mabel', 'Albert', 'heart', 'rate', 'pulse', 'will', 'high', 'low', 'exercise', 'run', 'during', 'before', 'after']
var text = player.GetVar("TextEntry");
player.SetVar("Points", countWordsFoundInText(text, wordsToFind));
```
