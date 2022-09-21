const dowButton = document.querySelector("#dowButton");

dowButton.addEventListener('click', () => {
    console.log('mukszik');
});

var url = 'http://localhost:3000/employees';

fetch(url)
.then(response => response.json())
.then(result => {console.log(result)})
.catch(error => {
    console.log('Hiba! Lekerdezés sikertelen');
    console.log(error);
});


// //Elso dolgozo neve
// fetch(url)
// .then(response => response.json())
// .then(result => {console.log(result[2].name)});