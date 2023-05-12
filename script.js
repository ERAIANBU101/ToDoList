var AddBtn = document.getElementById('AddTask');
var InputFld = document.getElementById('text');
var TaskList = document.getElementById('container');
const url = 'http://localhost:8080/data';
const url2 = 'http://localhost:8080/del';
const url3 = 'http://localhost:8080/load';

function onload(){
    fetch(url3)
    .then(response => response.text())
    .then(data =>JSON.parse(data).map(item => item.tasklist).forEach(element => {
        var para = document.createElement('p');
        para.innerText = element;
        TaskList.appendChild(para);
        para.addEventListener('click', () => {
            para.style.textDecoration = "line-through";
        });
        para.addEventListener('dblclick', () => {
            const dat = para.innerText;
            fetch(url2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: dat
            })
            .then(response => {
                console.log('Data sent to server:', dat);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
            TaskList.removeChild(para)

        });
    }))
    .catch(error => console.error('Error fetching data:', error));
}

AddBtn.addEventListener('click', ()=>{
    const data = InputFld.value;
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'text/plain'
        },
        body: data
    })
    .then(response =>{
        console.log('Data sent to server:', data);
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
    var para = document.createElement('p');
    para.innerText = InputFld.value;
    TaskList.appendChild(para);
    InputFld. value ='';
});









