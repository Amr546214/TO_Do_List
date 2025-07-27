let inp = document.querySelector("[name='Task']");
let btn = document.querySelector("button");
let tasks = document.querySelector(".tasks")

let ta = JSON.parse(localStorage.getItem("tasks")) || [];

function handletask() {
    tasks.innerHTML = "";
    ta.forEach((task, index) => {
        let onetask = document.createElement("div");
        onetask.className = "task-box";
        onetask.style.cssText = `
            width: 90%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 20px;
            margin-bottom: 10px;
        `;
        let text = document.createTextNode(task);
        onetask.appendChild(text);

        let but = document.createElement("button");
        but.textContent = "Delete";
        but.style.cssText = `
            border: 1px solid;
            border-radius: 20%;
            padding: 10px;
            background-color: red;
            color: white;
        `;
        but.onclick = () => {
            ta.splice(index, 1); //
            localStorage.setItem("tasks", JSON.stringify(ta));
            handletask();
        };
        onetask.appendChild(but);
        tasks.appendChild(onetask);
    })
}

btn.onclick = (e) => {
    e.preventDefault();
    if (inp.value.trim() !== "") {
        ta.push(inp.value.trim());
        localStorage.setItem("tasks", JSON.stringify(ta)); 
        inp.value = "";
        handletask();
    } else {
        Swal.fire({
    title: '<span style="color:red">⚠️ Empty Task!</span>',
    text: "Please write something before adding a task.",
    icon: 'warning',
    confirmButtonText: 'Got it!',
    customClass: {
        popup: 'custom-alert'
    }
});
    }
}
handletask();
