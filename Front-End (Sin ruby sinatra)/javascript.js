const input = document.getElementById("input");
const apiUrl = 'http://localhost:3000/api/v1/items/'; 
let list = document.getElementById("list");
let listarr = [];

//Tan pronto la pagina cargue, obtener los datos
document.addEventListener('DOMContentLoaded', () => {    
    get();
}, false);

//Obtener los datos y asignar todo lo necesario a las tareas de la lista
const get = () => {
    list.innerHTML = "";
    fetch(apiUrl, {
        method: 'GET'
    }) 
    .then(response => {
        return response.json()
    })
    .then(response => {
        listarr = response.data;
        //console.log(listarr) pa chequear su interior
        fillArray();
        setChangeListener();
        completedTasks();
    });
}

//Insertar la tarea
const insert = (inputValue) => {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "item": `${inputValue}`
        })
    })
    .then(success => {
        get();
    })
    .catch(error => {
        alert(error) 
    })
}

//Marcar la tarea como "completada"
const setDone = (id) => {
    fetch(apiUrl+id, {
        method: 'PUT'
    })
    .then(success => {
    })
    .catch(error => {
        alert(error)
    })
}

//Eliminar la tarea
const del = (id) => {
    fetch(apiUrl+id, {
        method: 'DELETE'
    })
    .then(success => {
        get(); 
    })
    .catch(error => {
        alert(error)
    })
}

//Para tachar las tareas completadas
const completedTasks = () => {
    let checklist = document.querySelectorAll(".checklist");
    let span = document.querySelectorAll(".text");
    for (let i = 0; i < listarr.length; i++) {
        if (listarr[i].done == 1){
        checklist[i].classList.add("hide-check");
        span[i].classList.add("line-through");
        }
    }
}

//Colocarle un changeListener (como checkbox) a cada tarea de la lista para poder marcar como tachada
const setChangeListener = () => {
    let checklist = document.querySelectorAll(".checklist");
    let span = document.querySelectorAll(".text");
    for (let i = 0; i < checklist.length; i++) {
    checklist[i].addEventListener('change', (event) => {
        if (event.target.checked) {
            checklist[i].setAttribute("class", "hide-check");
            span[i].setAttribute("class", "line-through");
            //console.log("Funciona") debuggeando xd
        }
    });
    }
}

//Para rellenar el array.
const fillArray = () => {
    let checklist = document.querySelectorAll(".checklist");
    let span = document.querySelectorAll(".span");
    //Cualquiera de los dos loops funcionan, pero este me tripea mas
    for (let element = 0; element < listarr.length; element++){
        fill(listarr[element]);
    }
    /*listarr.forEach(element => {
        fill(element);
    });*/  
}

//Rellenar la lista <li> con sus respectivos ids y tareas.
const fill = (element) => {
    const li = document.createElement("li");

    const item = createInputElement(element.id);
    const span = createSpanElement(element.item);
    const icon = createIconElement(element.id);

    list.appendChild(li);
    li.appendChild(item);
    li.appendChild(span);
    li.appendChild(icon);

    //*** CODIGO ANTERIOR, se ve feo lol
    /*let item = `<input type="checkbox" id="${"check-"+element.id}" onclick="setDone(${element.id})" name="check" class="checklist" style="float: left;"/><span class="text" style="float:left;">&nbsp;&nbsp;${element.item}</span>`;
    let delicon = `<img alt="svgImg" id="${element.id}" onclick="del(${element.id})" class='imgTrash' style="text-align: right;" src="./img/Trash.svg"/>`;
    const wholeitem = "<li>"+item+delicon+"</li>";

    list.innerHTML += (wholeitem);
    input.value = "";
    */
 }

const createInputElement = (id) => {
    const inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = `${id}`;
    inputElement.name = "check";
    inputElement.onclick = () => setDone(id);
    inputElement.classList.add("checklist");
    //inputElement.style.float = "left";

    return inputElement;
}

// createDivElement = () => {
//     const divElement = document.createElement("div");
//     divElement.id = "checkboxes";
// }

const createSpanElement = (item) => {
    const spanElement = document.createElement("span");
    spanElement.classList.add("text");
    spanElement.textContent = `${item}`;
    spanElement.style.fontFamily = "sans-serif";
    spanElement.style.fontSize = "14px";

    return spanElement;
}

const createIconElement = (id) => {
    const iconElement = document.createElement("i");
    iconElement.id = `${id}`;
    iconElement.classList.add("fas", "fa-trash");
    iconElement.onclick = () => del(id);
    iconElement.style.float = "right";
    iconElement.style.marginRight = "15px";

    return iconElement;
}

//Para poder agregar una tarea a la lista presionando enter
document.addEventListener('keydown', (event) => { 
    if (event.keyCode == 13) {
        if (input.value) insert(input.value);
        else alert("No puede dejarlo vacio.");
        input.value = ""
    }
  });

