function save(name, text, encoded) {
    let data = JSON.stringify( {
        name: name,
        text: text,
        encoded: encoded
    });

    let request = new XMLHttpRequest();
    let url = 'https://us-central1-nerdland-cipher.cloudfunctions.net/app/ciphers';
    request.open("POST", url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data);
}