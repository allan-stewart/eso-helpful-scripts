var assert = require('assert')

var analyzeText = function(text, options) {
    var processed = text.trim().replace(/\s{2,}/g, ' ').toLowerCase();
    
    var foundWords = 0;
    if (options && options.wordsToFind) {
        foundWords = options.wordsToFind.reduce(function (total, word) {
            return total + (processed.indexOf(word.toLowerCase()) >= 0 ? 1 : 0);
        }, 0)
    }

    return {
        wordCount: processed.split(' ').length,
        foundWords: foundWords
    }
}


describe('analyzeText', () => {
    describe('.wordCount', () => {
        it('works for simple sentences', () => {
            var result = analyzeText('this is a test')
            assert.equal(result.wordCount, 4)
        })

        it('collapses multiple whitespace characters', () => {
            var result = analyzeText('this  is \tanother\t\ttest\r\nwith  newlines')
            assert.equal(result.wordCount, 6)
        })

        it('trims the input', () => {
            var result = analyzeText(' this has surrounding whitespace ')
            assert.equal(result.wordCount, 4)
        })
    })

    describe('with wordsToFind option', () => {
        it('returns the number matching words found', () => {
            var result = analyzeText('This is some example text.', {wordsToFind: ['example']})
            assert.equal(result.foundWords, 1)
        })

        it('counts partial matches', () => {
            var result = analyzeText('This is some example text.', {wordsToFind: ['exampl', 'ome']})
            assert.equal(result.foundWords, 2)
        })

        it('is case insensitive', () => {
            var result = analyzeText('This is some example text.', {wordsToFind: ['tHis',]})
            assert.equal(result.foundWords, 1)
        })

        it('does not double count words', () => {
            var result = analyzeText('This is another example example', {wordsToFind: ['example']})
            assert.equal(result.foundWords, 1)
        })
    })

    describe('example usage', () => {
        it('returns the correct values', () => {
            var text = "Albert's heart rate will increase after exercise. But Mabel's will not because she is lazy."
            var result = analyzeText(text, { wordsToFind: ['increase', 'more', 'Mabel', 'Albert', 'heart', 'rate', 'pulse', 'will', 'high', 'low', 'exercise', 'run', 'during', 'before', 'after']})
            assert.equal(result.wordCount, 15)
            assert.equal(result.foundWords, 8)
        })
    })
})
