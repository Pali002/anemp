const dowButton = document.querySelector("#dowButton");
const empTable = document.querySelector("#empTable");

dowButton.addEventListener('click', () => {
    console.log('Letoltes');
    
var url = 'http://localhost:3000/employees';

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
    //console.log(employees[1].name);
    employees.forEach(employee => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        empTable.appendChild(tr);
    
        tdId.textContent = employee.id;
        tdName.textContent = employee.name;
        // console.log(employee.name);
    });

};

// //Elso dolgozo neve
// fetch(url)
// .then(response => response.json())
// .then(result => {console.log(result[2].name)});