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
    "A": ["AAA"],
    "B": ["AAC"],
    "C": ["AAG"],
    "D": ["AAT"],
    "E": ["ACA"],
    "F": ["ACC"],
    "G": ["ACG"],
    "H": ["ACT"],
    "I": ["AGA"],
    "J": ["AGC"],
    "K": ["AGG"],
    "L": ["AGT"],
    "M": ["ATA"],
    "N": ["ATC"],
    "O": ["ATG"],
    "P": ["ATT"],
    "Q": ["CAA"],
    "R": ["CAC"],
    "S": ["CAG"],
    "T": ["CAT"],
    "U": ["CCA"],
    "V": ["CCC"],
    "W": ["CCG"],
    "X": ["CCT"],
    "Y": ["CGA"],
    "Z": ["CGC"],
    " ": ["CGG", "CGT", "CTA", "CTC"],
    "a": ["CTG"],
    "b": ["CTT"],
    "c": ["GAA"],
    "d": ["GAC"],
    "e": ["GAG"],
    "f": ["GAT"],
    "g": ["GCA"],
    "h": ["GCC"],
    "i": ["GCG"],
    "j": ["GCT"],
    "k": ["GGA"],
    "l": ["GGC"],
    "m": ["GGG"],
    "n": ["GGT"],
    "o": ["GTA"],
    "p": ["GTC"],
    "q": ["GTG"],
    "r": ["GTT"],
    "s": ["TAA"],
    "t": ["TAC"],
    "u": ["TAG"],
    "v": ["TAT"],
    "w": ["TCA"],
    "x": ["TCC"],
    "y": ["TCG"],
    "z": ["TCT"],
    ",": ["TGA"],
    "?": ["TGC"],
    ".": ["TGG"],
    "!": ["TGT"],
    "opvulling": ["TTA", "TTC", "TTG", "TTT"]
}