const api_key = "37943237-7aa2-4c43-a29e-540aa07cb083"
const url = "https://api.thedogapi.com/v1/breeds?attach_breed=0"
var api_data = []

// pagination
let current_page = 1;
let rows = 8;

function displayDoggos(items, rows_per_page, page) {
    document.getElementById("main").innerHTML=''
    page--
    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    for(let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];
        const newBreed = document.createElement('div')
        newBreed.classList.add("doggo");
        newBreed.innerHTML = `<img src = ${item.image.url} height = "150" width = "200" />
                              <h5 align = "center">${item.name} </h5>`;
        document.getElementById("main").appendChild(newBreed)

    }
}

function SetupPagination(api_data, rows_per_page) {
    document.getElementById('pagination').innerHTML='';
    let page_count = Math.ceil(api_data.length / rows_per_page);
    for(let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i, api_data);
        document.getElementById('pagination').appendChild(btn);
    }
}

function PaginationButton (page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    if (current_page == page) button.classList.add('active');

    button.addEventListener('click', function() {
        current_page = page;
        displayDoggos(items, rows, current_page);
    });
    return button;
}

function getDoggos() {
    fetch(url)
    .then(response =>{
        return response.json();
    }).then(data =>{
        api_data = data;
        displayDoggos(api_data, rows, current_page)
        SetupPagination(api_data, rows);
        console.log(api_data)
    });
}

function toggleSort() {
    displayDoggos(api_data.reverse(), rows, current_page)
    SetupPagination(api_data, rows);
}

function filter() {
    var value = document.getElementById("filter").value;
    var filteredData = []
    api_data.forEach(breed => {
        if (`${breed.breed_group}` == value) {
            filteredData.push(breed)
        }
    });
    console.log(value, filteredData)
    displayDoggos(filteredData, rows, current_page)
    SetupPagination(filteredData);
}