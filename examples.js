var player = GetPlayer();
var text = player.GetVar('TextEntry');
var score = 0;
var pos = ""
pos =  text.toLowerCase().indexOf('increase');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('more');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('Mabel');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('Albert');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('heart');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('rate');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('pulse');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('will');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('high');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('low');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('exercise');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('run');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('during');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('before');
if(pos >=0 ){
score ++
}
pos =  text.toLowerCase().indexOf('after');
if(pos >=0 ){
score ++
}
player.SetVar("Points",score);

tVar("Points",score);





var player = GetPlayer();

var textEntered = player.GetVar("TextEntry");

var textEntered = textEntered.replace(/(^\s*)|(\s*$)/gi,"");

var textEntered = textEntered.replace(/[ ]{2,}/gi," ");

var textEntered = textEntered.replace(/\n /,"\n");

var numWords = textEntered.split(' ').filter(String).length;

player.SetVar("numWords", numWords);



//---------------
// INSTEAD
//---------------

var countWords = function(text) {
    return text.trim().replace(/\s{2,}/g, ' ').split(' ').length;
}

var countWordsFoundInText = function(text, wordsToFind) {
    var processed = text.trim().replace(/\s{2,}/g, ' ').toLowerCase();
    return wordsToFind.reduce(function (total, word) {
        return total + (processed.indexOf(word.toLowerCase()) >= 0 ? 1 : 0);
    }, 0)
}

var player = GetPlayer();
var text = player.GetVar("TextEntry");
var wordsToFind = ["increase", 'more', 'Mabel', 'Albert', 'heart', 'rate', 'pulse', 'will', 'high', 'low', 'exercise', 'run', 'during', 'before', 'after']
player.SetVar("numWords", countWords(text));
player.SetVar("Points", countWordsFoundInText(text, wordsToFind));
