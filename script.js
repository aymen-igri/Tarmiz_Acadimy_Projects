Tasks = document.getElementById("tasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

document.getElementById("add").addEventListener("click", ()=>{
    document.getElementById("overlay").style.display = "block";
    document.getElementById("addandupdate_task").style.display = "block";
});

document.getElementById("new").addEventListener("click",()=>{
        value = document.getElementById("new_task").value;
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = now.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        if(value !==""){
            tasks.push({
                task_name: value,
                date: formattedDate,
                done: false
            }); 
            document.getElementById("overlay").style.display = "none";
            document.getElementById("addandupdate_task").style.display = "none";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            console.log(tasks)
            renderTasks();
        }else{
            alert("Please enter a task");
        }
    })

// edit thing
let editeing_task = null
document.getElementById("tasks").addEventListener("click", (e)=>{
    editeing_task = e.target.closest(".task");
    if(e.target.textContent === "edit"){
        const curent_text = editeing_task.querySelector(".info h4").innerText;

        document.getElementById("overlay").style.display = "block";
        document.getElementById("update_task").style.display = "block";
        document.getElementById("up_task").value = curent_text;


    }else if(e.target.textContent === "done"){
        tasks = tasks.map((task) => {
            if (task.task_name === editeing_task.querySelector(".info h4").innerText) {
                return {
                    ...task,
                    done: !task.done
                };
            }
            return task; // <-- Always return the original task if not updating
        });
        renderTasks();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log(tasks);
    }else{
        tasks = tasks.filter((task) => {
            if( task.task_name !== editeing_task.querySelector(".info h4").innerText){
                return task;
            }
        })
        renderTasks();
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});

document.getElementById("update").addEventListener("click",()=>{
    const new_task = document.getElementById("up_task").value;
    if(new_task === ""){
        alert("Please enter a task");
        return;
    }else{

        tasks = tasks.map((task) => {
            if (task.task_name === editeing_task.querySelector(".info h4").innerText) {
                return {
                    ...task,
                    task_name: new_task
                };
            }
            return task; // <-- Always return the original task if not updating
        });
        renderTasks();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.getElementById("overlay").style.display = "none";
        document.getElementById("update_task").style.display = "none";
        console.log(tasks);
    }
    
})

function renderTasks() {
    Tasks.innerHTML = tasks.map((task)=>{
        let element = `<div class="task">
                        <div class="info">
                            <h4 style="text-decoration:${task.done ? 'line-through' : 'none'}">${task.task_name}</h4>
                            <h6>${task.date}</h6>
                        </div>
                        <div class="buttons">
                            <button>delete</button>
                            <button>edit</button>
                            <button>done</button>
                        </div>
                    </div>`;
        return element;
    }).join("");
}