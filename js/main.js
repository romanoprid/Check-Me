const hockeypuckList = document.getElementById('hockeypucks-list');
const searchBar = document.getElementById('find-hockeypuck');
const clearButton = document.getElementById('clear-search-bar');

const createHockeypuckID = document.getElementById('create_id');
const createHockeypuckName = document.getElementById('create_name');
const createHockeypuckAmount = document.getElementById('create_amount');
const createHockeypuckPrice = document.getElementById('create_priceInUAH');

let editActive = false;

const hockeypucks_url = 'http://localhost:8080/hockeypucks';

let hockeypucks = [];
function fetchData(url){
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < data.length; i++){
                hockeypucks.push(data[i]);
            }
            displayHockeypucks(hockeypucks);
        });
}

let currentHockeypucks = hockeypucks

searchBar.addEventListener('keyup', filterHockeypucks)
function filterHockeypucks(searchString){
    const searchFilterString = searchString.target.value.toLowerCase();
    const filteredHockeypucks = hockeypucks.filter(hockeypuck =>{
        return hockeypuck.name.toLowerCase().includes(searchFilterString);
    });
    currentHockeypucks = filteredHockeypucks;
    visualiseSortedHockeyPucks();
}
clearButton.addEventListener('click', ()=> {
    searchBar.value = '';
    currentHockeypucks = hockeypucks;
    visualiseSortedHockeyPucks();
})


function calculatePrice(){
    var priceSum = 0;
    var totalPriceLabel = document.getElementById('total-price');
    currentHockeypucks.forEach(hockeypuck => priceSum += hockeypuck.priceInUAH);
    totalPriceLabel.textContent = 'Total price: ' + priceSum + 'UAH';
}


function visualiseSortedHockeyPucks(){
    var sortType = document.getElementById('sort-select').value;
    if (sortType == 'none'){
        displayHockeypucks(currentHockeypucks);
        return;
    } else if (sortType == 'name') {
        currentHockeypucks.sort(compareByName);
    }
    else if (sortType == 'price'){
        currentHockeypucks.sort(compareByPrice);
    }
    displayHockeypucks(currentHockeypucks);
}


function compareByName(firstHockeypuck, secondHockeypuck){
    var firstHockeypuckName = firstHockeypuck.name.toLowerCase();
    var secondHockeypuckName = secondHockeypuck.name.toLowerCase();
    if (firstHockeypuckName < secondHockeypuckName) {
        return -1;
    }
    if (firstHockeypuckName > secondHockeypuckName) {
        return 1;
    }
    return 0;
}
function compareByPrice(firstHockeypuck, secondHockeypuck){
    return firstHockeypuck.priceInUAH - secondHockeypuck.priceInUAH;
}


const displayHockeypucks = (hockeypucksToShow) => {
    const htmlString = hockeypucksToShow.map((hockeypuck)=>{
        return `
        <li class="hockeypuck">
            <div>            
                <h2 class="hockeypuck_id"> ${hockeypuck.id}</h2>
                <h2> ${hockeypuck.name}</h2>
                <h3 class="amount">Amount: ${hockeypuck.amount}</h3>
                <h3 class="priceInUAH">Price: ${hockeypuck.priceInUAH}</h3>
            </div>
            <form class="form__edit_hockeypuck" id="form__edit_hockeypuck">
                    <input id="edit_name" name="name" type="text" placeholder="Name">
                    <input id="edit_amount" name="amount" type="number" step=0.1 placeholder="Amount">
                    <input id="edit_priceInUAH" name="priceInUAH" type="number" placeholder="Price">
            </form>
            <div class= "control-buttons">
                <button class="edit-button" id="edit-button" onclick="editRecord(this)">Edit</button>
                <button class="delete-button" id="delete-button" onclick="deleteRecord(this)">Delete</button>
            </div>
        </li>
        `
    }).join('');

    hockeypuckList.innerHTML = htmlString;
}

function deleteRecord(record){
    const list_to_delete = record.parentNode.parentNode;
    let hockeypuckId = parseInt(list_to_delete.childNodes[1].childNodes[1].innerHTML);
    let indexToDeleteFromAll = hockeypucks.findIndex(obj => obj.id==hockeypuckId);
    hockeypucks.splice(indexToDeleteFromAll, 1);
    let indexToDeleteFromCurrent = currentHockeypucks.findIndex(obj => obj.id==hockeypuckId);
    if (indexToDeleteFromCurrent != -1){
        currentHockeypucks.splice(indexToDeleteFromCurrent, 1);
    }
    deleteHockeypuck(hockeypuckId);
    visualiseSortedHockeyPucks();
    return list_to_delete;
}
function editRecord(record){
    const nodeList = record.parentNode.parentNode.childNodes;
    const editBar = nodeList[3];
    const infoBar = nodeList[1];
    let hockeypuckId = parseInt(infoBar.childNodes[1].innerHTML);
    let hockeypuckName = infoBar.childNodes[3].innerHTML;
    let hockeypuckAmount = parseFloat(infoBar.childNodes[5].innerHTML);
    let hockeypuckPrice = parseFloat(infoBar.childNodes[7].innerHTML);
    const editedHockeypuckName = nodeList[3][0];
    const editedHockeypuckAmount  = nodeList[3][1];
    const editedHockeypuckPrice = nodeList[3][2];

    let indexToEdit = hockeypucks.findIndex(obj => obj.id==hockeypuckId);
    if (editActive == false){
        openEditBar(editBar, infoBar);
        editActive = true;
    } else if (editActive == true){
        closeEditBar(editBar, infoBar);
        if (validateAmountAndPrice(editedHockeypuckAmount .value, editedHockeypuckPrice.value) == false){
            editedHockeypuckAmount .value = '';
            editedHockeypuckPrice.value = '';
            editActive = false;
            return;
        }
        let finalName = hockeypuckName;
        let finalAmount = hockeypuckAmount;
        let finalPrice = hockeypuckPrice;
        if (editedHockeypuckName.value == "" && editedHockeypuckAmount .value == "" && editedHockeypuckPrice.value == ""){
            editActive = false;
            visualiseSortedHockeyPucks();
            return
        }
        if (editedHockeypuckName.value != "") {
            hockeypucks[indexToEdit]["name"] = editedHockeypuckName.value;
            finalName = editedHockeypuckName.value;
        } else {
            hockeypucks[indexToEdit]["name"] = hockeypuckName;
        }
        if (editedHockeypuckAmount .value != "") {
            hockeypucks[indexToEdit]["amount"] = parseFloat(editedHockeypuckAmount .value);
            finalAmount =  parseFloat(editedHockeypuckAmount .value);
        } else{
            hockeypucks[indexToEdit]["amount"] = hockeypuckAmount;
        }
        if (editedHockeypuckPrice.value != "") {
            hockeypucks[indexToEdit]["priceInUAH"] =  parseFloat(editedHockeypuckPrice.value);
            finalPrice = parseFloat(editedHockeypuckPrice.value);
        } else{
            hockeypucks[indexToEdit]["priceInUAH"] = hockeypuckPrice;
        }

        if (searchBar.value != '' && editedHockeypuckName.value != '' && editedHockeypuckName.value.includes(searchBar.value) == false){
            let indexToDeleteFromCurrent = currentHockeypucks.findIndex(obj => obj.id==hockeypuckId);
            currentHockeypucks.splice(indexToDeleteFromCurrent, 1);
        }

        const jsonHockeypuck = createJSON(finalName, finalAmount, finalPrice)
        editHockeypuck(hockeypuckId, jsonHockeypuck)
        editActive = false;
        visualiseSortedHockeyPucks();
    }
}

function openEditBar(editBar, infoBar){
    editBar.classList.add('open');
    editBar.classList.remove('hide');
    infoBar.classList.add('hide');
    infoBar.classList.remove('open');
}

function closeEditBar(editBar, infoBar){
    editBar.classList.add('hide');
    editBar.classList.remove('open');
    infoBar.classList.add('open');
    infoBar.classList.remove('hide');
}
async function createHockeypuck(){
    if(validateFormRequirements(createHockeypuckName.value, createHockeypuckAmount.value, createHockeypuckPrice.value) == false){
        return;
    }
    if(validateAmountAndPrice(createHockeypuckAmount.value, createHockeypuckPrice.value) == false){
        return;
    }
    const jsonHockeypuck = createJSON(createHockeypuckName.value, createHockeypuckAmount.value, createHockeypuckPrice.value);
    await postHockeypuck(jsonHockeypuck);
    visualiseSortedHockeyPucks();
    return jsonHockeypuck;
}
async function postHockeypuck(newHockeypuck) {
    console.log(hockeypucks);
    let response = await fetch(hockeypucks_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newHockeypuck)
    }).then(response => response.json())
        .then(data => hockeypucks.push(data))
    return response;
}

async function deleteHockeypuck(id){
    let response = await fetch(hockeypucks_url + '/' + id, {
        method: 'DELETE',
    })
    return response;
}
async function editHockeypuck(id, editedHockeypuck){
    fetch(hockeypucks_url + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(editedHockeypuck)
    })
}
function createJSON(name, amount, price){
    let createdHockeypuck = {
        "name": name,
        "amount": parseFloat(amount),
        "priceInUAH": parseFloat(price)
    }
    return createdHockeypuck;
}




function validateAmountAndPrice(amount, price){
    if (parseFloat(amount) <=0){
        alert('amount cannot be less then zero');
        return false;
    }
    if (parseFloat(price) <=0){
        alert('price cannot be less then zero');
        return false;
    }
    return true;
}
function validateFormRequirements(name, amount, price){
    if(name == ''){
        alert('name field is requiered')
        return false;
    }
    if (amount == ''){
        alert('amount field is requiered');
        return false;
    }
    if (price == 0){
        alert('price  field is requiered');
        return false;
    }
    return true;
}


fetchData(hockeypucks_url);