const supabaseUrl = "https://sqzvwtpnsmhetokppevz.supabase.co";
const supabaseKey = "sb_publishable_CU3WNUWB-GFRdOxTpnntPA_i7DOeN5t";

const client = supabase.createClient(supabaseUrl, supabaseKey);

// ---- DOM ELEMENTS ----
let noteModal = document.getElementById("noteModal");
let addNoteFab = document.getElementById("addNoteFab");
let closeModal = document.getElementById("closeModal");
let saveNoteBtn = document.getElementById("saveNoteBtn");
let logoutBtn = document.getElementById("logoutBtn");

// Track whether we are editing an existing note (holds the note's ID) or creating a new one (null)
let editNoteId = null;

// ---- MODAL CONTROLS ----
addNoteFab.addEventListener("click", () => {
  editNoteId = null; // Clear edit tracking for a new note
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";
  saveNoteBtn.innerText = "Save Note";
  noteModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  noteModal.style.display = "none";
});

// ---- AUTHENTICATION GUARD ----
async function getCurrentUser() {
  const { data: { user } } = await client.auth.getUser();
  if (!user) {
    window.location.href = "../index.html";
    return null;
  }
  return user;
}

// ---- SAVE OR UPDATE NOTE ----
saveNoteBtn.addEventListener("click", async () => {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;
  const user = await getCurrentUser();
  if (!user) return;

  if (editNoteId) {
    // ---- UPDATE MODE ----
    const { error } = await client
      .from("notes")
      .update({ title: title, content: content })
      .eq("id", editNoteId);

    if (error) {
      console.error(error);
      return;
    } else {
      alert("Note Updated Successfully");
    }
  } else {
    // ---- INSERT MODE ----
    const { error } = await client.from("notes").insert([
      {
        title: title,
        content: content,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error(error); // Fixed original 'console.lof' typo
      return;
    } else {
      alert("Note Saved");
    }
  }

  // Cleanup UI and refresh list after operation
  editNoteId = null;
  noteModal.style.display = "none";
  loadNotes();
});

// ---- FETCH NOTES FROM DATABASE ----
async function loadNotes() {
  const user = await getCurrentUser();
  if (!user) return;

  const { data, error } = await client
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  } else {
    renderNotes(data);
  }
}

// Fixed: Passed function reference 'loadNotes' instead of instantly executing it with 'loadNotes()'
document.addEventListener("DOMContentLoaded", loadNotes);

// ---- UI RENDERING ----
function renderNotes(notes) {
  const notesGrid = document.getElementById("notesGrid");
  notesGrid.innerHTML = "";

  notes.forEach((note) => {
    // Escape single quotes to prevent breaking inline HTML string parameters
    const escapedTitle = note.title.replace(/'/g, "\\'");
    const escapedContent = note.content.replace(/'/g, "\\'");

    notesGrid.innerHTML += `
        <div class="note-card">
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="deleteNote('${note.id}')">Delete</button>
            <button onclick="editNote('${note.id}', '${escapedTitle}', '${escapedContent}')">Update</button>
        </div>
    `;
  });
}

// ---- TRIGGER EDIT MODE ----
function editNote(id, title, content) {
  editNoteId = id; // Store active note context

  // Populate existing modal inputs with the note details
  document.getElementById("noteTitle").value = title;
  document.getElementById("noteContent").value = content;

  // Change button label and display modal
  saveNoteBtn.innerText = "Update Note";
  noteModal.style.display = "block";
}

// ---- DELETE NOTE ----
async function deleteNote(id) {
  const { error } = await client
    .from("notes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
  } else {
    loadNotes();
  }
}

// ---- LOGOUT ----
logoutBtn.addEventListener("click", async () => {
  await client.auth.signOut();
  window.location.href = "../index.html";
});


logoutBtn.addEventListener("click", async ()=>{

    await client.auth.signOut();

    window.location.href="../index.html";

});