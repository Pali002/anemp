const dowButton = document.querySelector("#dowButton");
const addButton = document.querySelector("#addButton");
const empTable = document.querySelector("#empTable");
const empName = document.querySelector("#name");

const host = 'http://localhost:3000';

dowButton.addEventListener('click', () => {
    let endpoint = 'employees';
    let url = host + '/' + endpoint;

    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result[2].name);
        renderTable(result);
    })
    .catch(error => {
        console.log('Hiba! Lekerdezés sikertelen');
        console.log(error);
    });
});

function renderTable(employees) {
    empTable.textContent = '';
    //console.log(employees[1].name);
    employees.forEach(employee => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdDel = document.createElement('td');
        let delBtn = document.createElement('button');
        delBtn.textContent = 'Törlés';
        delBtn.addEventListener('click', () => {
            deleteEmployee(employee.id);
        });
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdDel);
        tdDel.appendChild(delBtn);
        empTable.appendChild(tr);
    
        tdId.textContent = employee.id;
        tdName.textContent = employee.name;
        // console.log(employee.name);
    });

};

addButton.addEventListener('click', () => {
    let endpoint = 'employees';
    let url = host + '/' + endpoint;
    let employee = {
        name: empName.value
    };
    fetch(url, {
        method: 'post',
        body: JSON.stringify(employee),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });
});

function deleteEmployee(id) {
    console.log(id);
    let endpoint = 'employees';
    let url = host + '/' + endpoint + '/' +id;
    fetch(url, {
        method: 'delete'
    })
    .then(response => response.json())
    .then(result =>{
        console.log(result);
    });
};