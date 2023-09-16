isUpperCase = (char) => char >= 'A' && char <= 'Z';
isLowerCase = (char) => char >= 'a' && char <= 'z';

function corrigirCapsLock(word) {
    if (word.split('').every(isUpperCase) || (isLowerCase(word[0]) && word.slice(1).split('').every(isUpperCase)))
        return word.split('').map(char => isUpperCase(char) ? char.toLowerCase() : char.toUpperCase()).join('');
    
    else return word;
    
}

function processData(input) {
    const word = input.trim();
    const wordCorrected = corrigirCapsLock(word);
    console.log(wordCorrected);
} 


processData('çSDKF');