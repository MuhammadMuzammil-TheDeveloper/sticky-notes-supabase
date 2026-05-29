function createNote() {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  const title = titleInput.value;
  const content = contentInput.value;

  let notesContainer = document.getElementById("notes-container");

  // Validation
  if (title === "" || content === "") {
    alert("Please fill all fields");
    return;
  }

  console.log(title, content);

  let notes = `
    <div class="note">

      <button class="delete-btn" onClick="deleteEach(this)">X</button>
      <button class="edit-btn" onClick="editEach(this)">Edit</button>

      <h3>${title}</h3>
      <p>${content}</p>

    </div>
  `;

  notesContainer.innerHTML += notes;

  console.log("Notes Container", notesContainer);

  // Clear Inputs
  titleInput.value = "";
  contentInput.value = "";
}

function deleteEach(button) {
  console.log("workingggg//....");
  console.log(button);
  button.parentElement.remove();
}
function editEach(button) {
  const note = button.parentElement;
  const title = note.querySelector("h3");
  const content = note.querySelector("p");
  const newTitle = prompt(`Edit Text`, title.innerText);
  const newContent = prompt(`Edit Text`, content.innerText);
  title.innerText = newTitle;
  content.innerText = newContent;
}

function deleteAllNote(){
    let notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML="";

}