let addTask = document.querySelector('.button');
let tasks = document.querySelector('.tasks');
let deleteTask = document.querySelector('.delete__task');
let input = document.querySelector('.input');


let DATA = [];
if(localStorage.getItem('DATA')){
	DATA = JSON.parse(localStorage.getItem('DATA'))
	showTaks()
}

addTask.addEventListener("click", () => {
	if(input.value){
		let newTask = {
			title: input.value,
			state: false,
			id: Math.random() * 100
		}
		DATA.push(newTask)
		localStorage.setItem("DATA", JSON.stringify(DATA))
		showTaks()
		input.value = ''
	}
})

function showTaks(){
	if(DATA.length === 0) tasks.innerHTML = ''
	let showTaks =''
	DATA.forEach(function(item, i){
		showTaks += `
		<div>
		<input onchange="getState(${i})" class="checkbox" type="checkbox" ${item.state? 'checked' : ''}>
		${item.title}
		</div>
		`
		tasks.innerHTML = showTaks
		localStorage.setItem("DATA", JSON.stringify(DATA))
	})
}

function getState(e){
	DATA[e].state = !DATA[e].state
	showTaks()
}

deleteTask.addEventListener("click", () => {
	let newData = DATA.filter(e => {return !e.state})
	DATA = newData
	showTaks()
	localStorage.setItem("DATA", JSON.stringify(DATA))
})

