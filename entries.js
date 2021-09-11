const table = document.getElementById("entryTable");
const tableBody = document.getElementById("entryTableBody");

function setTableData(items) {
    tableBody.innerHTML = "";
    items.forEach(item => {
        if(item.id == "EXAMPLEID")
            return;

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        let nameLabel = document.createTextNode(item.name);
        nameCell.appendChild(nameLabel);

        let textCell = document.createElement("td");
        let textLabel = document.createTextNode(item.text);
        textCell.appendChild(textLabel);

        let encodedCell = document.createElement("td");
        let encodedLabel = document.createTextNode(item.encoded);
        encodedCell.appendChild(encodedLabel);

        let deleteCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "delete";
        deleteButton.onclick = function () {
            deleteEntry(item);
        }
        deleteButton.style.borderRadius = "90px";
        deleteCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(textCell);
        row.appendChild(encodedCell);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });
}

function retrieveData() {
    let request = new XMLHttpRequest();
    let url = 'https://us-central1-nerdland-cipher.cloudfunctions.net/app/ciphers';
    request.open("GET", url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

    request.onload = (e) => {
        var respons = JSON.parse(request.response);
        setTableData(respons);
    }
}

function deleteEntry(item) {
    let text = "Ben je zeker dat je de cipher van " + item.user + " met text: \"" + item.text + "\" wilt verwijderen?";
    if (!confirm(text))
        return;

    let request = new XMLHttpRequest();
    let url = 'https://us-central1-nerdland-cipher.cloudfunctions.net/app/ciphers/' + item.id;
    request.open("DELETE", url);
    request.send();

    request.onload = (e) => retrieveData();
}

retrieveData()
