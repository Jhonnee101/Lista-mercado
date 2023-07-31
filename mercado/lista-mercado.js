const taskInput = document.querySelector(".task-input input")
const filters = document.querySelectorAll(".filters span")
const clearAll = document.querySelector(".clear-btn")
const taskBox = document.querySelector(".task-box")

window.addEventListener('load', async () => {
  await showTodo("all");
})

clearAll.addEventListener("click", async () => {
  await deleteAll()
  await showTodo("all");
});

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

taskInput.addEventListener("keyup", async (e) => {
  let productName = taskInput.value.trim();
  if (e.key == "Enter" && productName) {
    await createTodo(productName)
    taskInput.value = "";
    showTodo(document.querySelector("span.active").id);
  }
});

async function showTodo(filter) {
  const todos = await listTodos()
  if (!todos || Array.isArray(todos) && todos.length === 0) {
    taskBox.innerHTML = '<span>Voce não possui compras pendentes</span>';
    return
  }
  const liTags = todos.map(todo => {
    const id = todo.id
    let completed = todo.status == "completed" ? "checked" : "";
    if (filter == todo.status || filter == "all") {
      return `<li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                    <p class="${completed}">${todo.name}</p>
                </label>
                  <div class="settings">
                      <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                      <ul class="task-menu">
                          <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Deletar</li>
                      </ul>
                  </div>
              </li>`;
    }
  })
  taskBox.innerHTML = liTags.join('')
  let checkTask = taskBox.querySelectorAll(".task");
  !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
  taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}

async function createTodo(productName) {
  await fetch('http://localhost:3000/product', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ productName })
  })
}

async function listTodos() {
  const response = await fetch('http://localhost:3000/products')
  const products = await response.json()
  return products.map((product) => ({
    name: product.productName,
    id: product.id
  }))
}

async function deleteAll() {
  await fetch(`http://localhost:3000/products/`, {
    method: 'DELETE',
  })
}

function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
  } else {
    taskName.classList.remove("checked");
  }
}

async function deleteTask(deleteId, filter) {
  await fetch(`http://localhost:3000/product/${deleteId}`, {
    method: 'DELETE',
  })
  await showTodo(filter);
}
