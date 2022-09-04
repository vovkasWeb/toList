const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
	const objOfTasks = arrOfTasks.reduce((acc,task) => {
acc[task._id] = task;
return acc;
	},{})

	//Elemnt UI
	const listContainer = document.querySelector('.tasks-list-section .list-group');

const form =document.forms['addTask'];
const inputTitle =form.elements['title'];
const inputBody = form.elements['body'];


//events
	renderAllTasks(objOfTasks);
form.addEventListener('submit',onFormSubmitHandler);
listContainer.addEventListener('click', onDeleteHandler);

	function renderAllTasks(tasksList){
   if(!tasksList) {
		console.log("Передайте список задач!");
		return;
	}
	const fragment = document.createDocumentFragment();
	Object.values(tasksList).forEach(task=>{
		const li =listItemTemplate(task);
		fragment.appendChild(li);
	});


   listContainer.appendChild(fragment);
	}


	function listItemTemplate({_id,title,body} ={}){
const li = document.createElement('li');
li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap','mt-2');
li.setAttribute('data-task-id',_id);



const span = document.createElement('span');
span.textContent = title;
span.style.fontWeight ='bold';

const deleteBtn = document.createElement('button');
deleteBtn.textContent= "Delete task";
deleteBtn.classList.add('btn','btn-danger','ml-auto','delete-btn');

const article = document.createElement('p');
article.textContent = body;
article.classList.add('mt-2', 'w-100');

li.appendChild(span);
li.appendChild(deleteBtn);
li.appendChild(article);

return li;
	}
// console.log(objOfTasks);
function onFormSubmitHandler(e){
	e.preventDefault();
	const titleValue =inputTitle.value;
	const bodyValue = inputBody.value;
	if(!title || !bodyValue){
		alert('Пожалуста ведите значения');
		return;
	}
const task= creteNewTask(titleValue,bodyValue);
const listItem = listItemTemplate(task);
listContainer.insertAdjacentElement('afterbegin',listItem);
form.reset();
}	
function creteNewTask(title,body){
	const newTask ={
		title,
		body,
		completed:false,
		_id: `task-${Math.random()}`,
	}
		
	objOfTasks[newTask._id] =newTask;
	return{...newTask};
}

function deleteTask(id){
const {title} = objOfTasks[id];
	const iscConfirm = confirm(`Точно вы хотите удалит : ${title}`);
	 if(!iscConfirm) return iscConfirm;
	 delete objOfTasks[id];
	 return iscConfirm;
}

function deleteTaskFromHtml(confirmed,el){
	if(!confirmed) return;
	el.remove();
}

function onDeleteHandler({target}){
if(target.classList.contains('delete-btn')){
const parent = target.closest('[data-task-id]');
const id =parent.dataset.taskId;
const cofirmed =deleteTask(id);
deleteTaskFromHtml(cofirmed, parent);
}
}

})(tasks);
