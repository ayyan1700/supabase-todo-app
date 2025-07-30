import { getSupabase } from './api.js';
const supabase = getSupabase();
console.log(supabase);

let input = document.getElementById("text");
let rollNumber = document.getElementById("rollNum");
let Subject = document.getElementById("subject");

document.getElementById("add").addEventListener("click", async function () {
  let text = input.value.trim();
  let rollnum = rollNumber.value.trim();
  let sub = Subject.value.trim();

  if (!text || !rollnum || !sub) return;

  const { data, error } = await supabase
    .from('todo')
    .insert({
      todotext: text,
      "Roll-Number": rollnum,
      Subject: sub
    })
    .select();

  if (error) {
    console.log("error: " + error.message);
    return;
  }

  input.value = "";
  rollNumber.value = "";
  Subject.value = "";

  tasks(data[0]);
});

async function tasks(task) {
  let ul = document.getElementById("list");
  let li = document.createElement("li");

  li.innerHTML = `
  <div class="field">
    <span>Task</span>
    <p class="t-name">${task.todotext}</p>
  </div>
  <div class="field">
    <span>Roll No</span>
    <p class="t-roll">${task["Roll-Number"]}</p>
  </div>
  <div class="field">
    <span>Subject</span>
    <p class="t-sub">${task.Subject}</p>
  </div>
  <div class="actions">
    <button class="Edit" data-id="${task.id}">Edit</button>
    <button class="del" data-id="${task.id}">Del</button>
  </div>
`;

  ul.appendChild(li);

  let delBtn = li.querySelector(".del");
  delBtn.addEventListener("click", async function () {
    const id = delBtn.getAttribute("data-id");

    const { error } = await supabase
      .from('todo')
      .delete()
      .eq('id', id);

    if (error) {
      console.log("Delete error: " + error.message);
      return;
    }

    li.remove();
  });

  let editBtn = li.querySelector(".Edit");
  editBtn.addEventListener("click", async function () {
    const id = editBtn.getAttribute("data-id");

   let Eltext = li.querySelector(".t-name");
   let Elroll = li.querySelector(".t-roll");
   let Elsub = li.querySelector(".t-sub");

    const newText = prompt("Edit task text:" , Eltext.textContent);
    const newrollnum = prompt("Edit roll number:" , Elroll.textContent);
    const newsub = prompt("Edit subject:" , Elsub.textContent);

    if (!newText || !newText.trim() && !newrollnum || !newrollnum.trim() && !newsub || !newsub.trim()) return;

    const { error } = await supabase
      .from('todo')
      .update({
        todotext: newText.trim(),
        "Roll-Number": newrollnum.trim(),
        Subject: newsub.trim()
      })
      .eq('id', id);

    if (error) {
      console.log("Edit error: " + error.message);
      return;
    }
     
    Eltext.textContent = newText;
    Elroll.textContent = newrollnum;
    Elsub.textContent = newsub


  });

}






