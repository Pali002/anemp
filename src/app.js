const dowButton = document.querySelector("#dowButton");
const addButton = document.querySelector("#addButton");
const empTable = document.querySelector("#empTable");
const empName = document.querySelector("#name");
var tbody = document.createElement('tbody');
empTable.appendChild(tbody);

const host = 'http://localhost:3000';


(()=> {
    console.log('kívül')
    getEmployees();
})();

// dowButton.addEventListener('click', () => {
    
// });

function getEmployees() {
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
}

function renderTable(employees) {
    tbody.textContent = '';
    //console.log(employees[1].name);
    employees.forEach(employee => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdButton = document.createElement('td');
        let delBtn = makeDelButton(employee.id);
        let editBtn = makeEditButton(employee);

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdButton);
        tdButton.appendChild(delBtn);
        tdButton.appendChild(editBtn);
        tbody.appendChild(tr);
    
        tdId.textContent = employee.id;
        tdName.textContent = employee.name;
        // console.log(employee.name);
    });

};

function makeDelButton(id) {
    let delBtn = document.createElement('button');
    delBtn.classList.add('btn');
    delBtn.classList.add('btn-primary');
    delBtn.textContent = 'Törlés';
    delBtn.addEventListener('click', ()=> {
        let answer = confirm('Biztosan törlöd?');
        if (answer) {
            deleteEmployee(id);
            let actualTr = delBtn.parentElement.parentElement;
            actualTr.parentNode.removeChild(actualTr);
        }        
    });
    return delBtn;
}

addButton.addEventListener('click', () => {
    addEmployee();
});

function addEmployee() {
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
        empName.value='';
        addEmployeeToTable(employee);
    });
}

function addEmployeeToTable(employee) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdName = document.createElement('td');
    let tdButton = document.createElement('td');

    tdId.textContent = employee.id;
    tdName.textContent = employee.name;

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdButton);

    let delButton = makeDelButton(employee.id);
    tdButton.appendChild(delButton);
    tbody.appendChild(tr);
}

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

function makeEditButton(employee) {
    let editBtn = document.createElement('button');
    editBtn.classList.add('btn');
    editBtn.classList.add('btn-primary');
    editBtn.textContent = 'Szerkesztés';
    editBtn.addEventListener('click', ()=> {
        
    });
    return editBtn;
}