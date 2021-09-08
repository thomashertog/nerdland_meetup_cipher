let button = document.getElementById('js-calc-cipher');
let cipherInputArea = document.getElementById('cipher-input');
let cipherOutputArea = document.getElementById('cipher-output');

let charCountDiv = document.getElementById('char-count');


// Handle Cipher button
button.addEventListener('click', function(event) {
    let cipherInput = cipherInputArea.value
    let cipherOutput = [];
    for (char of cipherInput) {
        let cipherArray = cipher[char];
        let randomIndex = Math.floor(Math.random() * cipherArray.length);
        cipherOutput.push(cipherArray[randomIndex]);
    }
    while (cipherOutput.length < 112) {
        let randomIndex = Math.floor(Math.random() * cipher["opvulling"].length);
        cipherOutput.push(cipher["opvulling"][randomIndex]);
    }
    cipherOutputArea.textContent = cipherOutput.join(' ');

    draw(cipherOutput);
});

// Update count on text changes
cipherInputArea.addEventListener('input', function(event){
    let remaining = 120 - cipherInputArea.value.length;
    let text = new String(remaining) + " characters left";
    charCountDiv.textContent = text;
})

const cipher = {
    "A": ["AGA"],
    "B": ["TGT"],
    "C": ["AGT"],
    "D": ["GGG"],
    "E": ["GTC"],
    "F": ["TAT"],
    "G": ["AAA"],
    "H": ["TCT"],
    "I": ["GGT"],
    "J": ["ACT"],
    "K": ["TGG"],
    "L": ["ACC"],
    "M": ["GAT"],
    "N": ["CAG"],
    "O": ["GGA"],
    "P": ["TAC"],
    "Q": ["TGC"],
    "R": ["ATG"],
    "S": ["GGC"],
    "T": ["ACG"],
    "U": ["GCA"],
    "V": ["TCC"],
    "W": ["TTC"],
    "X": ["AGC"],
    "Y": ["AAT"],
    "Z": ["GTG"],
    " ": ["CTC", "CAC", "TAG", "CGG"],
    "a": ["CAA"],
    "b": ["TTG"],
    "c": ["GCG"],
    "d": ["TTA"],
    "e": ["GCC"],
    "f": ["TCA"],
    "g": ["GAC"],
    "h": ["ATC"],
    "i": ["GAA"],
    "j": ["CGA"],
    "k": ["GAG"],
    "l": ["AGG"],
    "m": ["TCG"],
    "n": ["TGA"],
    "o": ["GCT"],
    "p": ["GTT"],
    "q": ["ATT"],
    "r": ["CCG"],
    "s": ["TTT"],
    "t": ["AAG"],
    "u": ["CCC"],
    "v": ["CTG"],
    "w": ["GTA"],
    "x": ["AAC"],
    "y": ["CTT"],
    "z": ["ATA"],
    ",": ["TAA"],
    "?": ["CGC"],
    ".": ["CCA"],
    "!": ["CAT"],
    "opvulling": ["CGT", "CTA", "CCT", "ACA"]
}