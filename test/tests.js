var assert = require('assert')

var countWords = function(text) {
    return text.trim().replace(/\s{2,}/g, ' ').split(' ').length;
}

var countWordsFoundInText = function(text, wordsToFind) {
    var processed = text.trim().replace(/\s{2,}/g, ' ').toLowerCase();
    return wordsToFind.reduce(function (total, word) {
        return total + (processed.indexOf(word.toLowerCase()) >= 0 ? 1 : 0);
    }, 0)
}

describe('countWords', () => {
    it('works for simple sentences', () => {
        var result = countWords('this is a test')
        assert.equal(result, 4)
    })

    it('collapses multiple whitespace characters', () => {
        var result = countWords('this  is \tanother\t\ttest\r\nwith  newlines')
        assert.equal(result, 6)
    })

    it('trims the input', () => {
        var result = countWords(' this has surrounding whitespace ')
        assert.equal(result, 4)
    })
})

describe('countWordsFoundInText', () => {
    it('returns the number matching words found', () => {
        var result = countWordsFoundInText('This is some example text.', ['example'])
        assert.equal(result, 1)
    })

    it('counts partial matches', () => {
        var result = countWordsFoundInText('This is some example text.', ['exampl', 'ome'])
        assert.equal(result, 2)
    })

    it('is case insensitive', () => {
        var result = countWordsFoundInText('This is some example text.', ['tHis',])
        assert.equal(result, 1)
    })

    it('does not double count words', () => {
        var result = countWordsFoundInText('This is another example example', ['example'])
        assert.equal(result, 1)
    })

    it('returns 0 if no words were found', () => {
        var result = countWordsFoundInText('This is another example', ['zebra'])
        assert.equal(result, 0)
    })
})

describe('example usage', () => {
    it('returns the correct values', () => {
        var text = "Albert's heart rate will increase after exercise. But Mabel's will not because she is lazy."
        var wordsToFind = ['increase', 'more', 'Mabel', 'Albert', 'heart', 'rate', 'pulse', 'will', 'high', 'low', 'exercise', 'run', 'during', 'before', 'after']
        assert.equal(countWords(text), 15)
        assert.equal(countWordsFoundInText(text, wordsToFind), 8)
    })
})
