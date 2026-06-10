// async function createNote() {
//   const titleInput = document.getElementById("title");
//   const contentInput = document.getElementById("content");

//   const title = titleInput.value;
//   const content = contentInput.value;

//   let notesContainer = document.getElementById("notes-container");

//   // Validation
//   if (title === "" || content === "") {
//     alert("Please fill all fields");
//     return;
//   }
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   const { data, error } = await supabaseClient.from("notes").insert([
//     {
//       title,
//       content,
//       user_id: user.id,
//     },
//   ]);

//   // console.log(data);

//   console.log(title, content);

//   let notes = `
//     <div class="note">

//       <button class="delete-btn" onClick="deleteEach(this)">X</button>
//       <button class="edit-btn" onClick="editEach(this)">Edit</button>

//       <h3>${title}</h3>
//       <p>${content}</p>

//     </div>
//   `;

//   // notesContainer.innerHTML += notes;
//   await loadNotes();
//   console.log("Notes Container", notesContainer);

//   // Clear Inputs
//   titleInput.value = "";
//   contentInput.value = "";
// }
async function createNote() {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  const title = titleInput.value;
  const content = contentInput.value;

  if (title === "" || content === "") {
    alert("Please fill all fields");
    return;
  }

  // get user
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  // insert into DB
  const { data, error } = await supabaseClient
    .from("notes")
    .insert([
      {
        title,
        content,
        user_id: user.id,
      },
    ]);

  if (error) {
    console.log(error);
    alert("Error saving note");
    return;
  }

  console.log("Inserted:", data);

  // clear inputs
  titleInput.value = "";
  contentInput.value = "";

  // reload UI from DB
  loadNotes();
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

function deleteAllNote() {
  let notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = "";
}

