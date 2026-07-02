const supabaseUrl = "https://sqzvwtpnsmhetokppevz.supabase.co";
const supabaseKey = "sb_publishable_CU3WNUWB-GFRdOxTpnntPA_i7DOeN5t";

const client = supabase.createClient(supabaseUrl, supabaseKey);

// ---- DOM ELEMENTS ----
let noteModal = document.getElementById("noteModal");
let addNoteFab = document.getElementById("addNoteFab");
let closeModal = document.getElementById("closeModal");
let saveNoteBtn = document.getElementById("saveNoteBtn");
let logoutBtn = document.getElementById("logoutBtn");
let notesGrid = document.getElementById("notesGrid");
let emptyState = document.getElementById("emptyState");
let noteCount = document.getElementById("noteCount");
let searchNotes = document.getElementById("searchNotes");
let deleteAllNotesBtn = document.getElementById("deleteAllNotes");
let userAvatar = document.getElementById("userAvatar");
let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");

// Track whether we are editing an existing note (holds the note's ID) or creating a new one (null)
let editNoteId = null;

// Cached notes so search can filter client-side without refetching
let allNotes = [];

// Cycle of sticky-note colors, matching the design system in dashboard.css
const NOTE_COLORS = ["yellow", "green", "red", "purple", "blue"];

// ---- MODAL CONTROLS ----
addNoteFab.addEventListener("click", () => {
  editNoteId = null; // Clear edit tracking for a new note
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";
  document.getElementById("modalTitle").innerText = "New Note";
  saveNoteBtn.innerText = "Save Note";
  noteModal.classList.add("open");
});

closeModal.addEventListener("click", () => {
  noteModal.classList.remove("open");
});

noteModal.querySelector(".modal-backdrop").addEventListener("click", () => {
  noteModal.classList.remove("open");
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

// ---- POPULATE USER CHIP ----
async function loadUserChip() {
  const user = await getCurrentUser();
  if (!user) return;

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    (user.email ? user.email.split("@")[0] : "Account");

  userName.innerText = displayName;
  userEmail.innerText = user.email || "";
  userAvatar.innerText = displayName.charAt(0).toUpperCase();
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
    }
  }

  // Cleanup UI and refresh list after operation
  editNoteId = null;
  noteModal.classList.remove("open");
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
  }

  allNotes = data || [];
  renderNotes(allNotes);
}

// Fixed: Passed function reference 'loadNotes' instead of instantly executing it with 'loadNotes()'
document.addEventListener("DOMContentLoaded", () => {
  loadUserChip();
  loadNotes();
});

// ---- HELPERS ----
function formatTimestamp(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const datePart = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart} • ${timePart}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.innerText = str ?? "";
  return div.innerHTML;
}

// Renders note content either as a bullet list (if lines look like a list)
// or as a plain paragraph.
function renderNoteBody(content) {
  const lines = (content || "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const looksLikeList =
    lines.length > 1 &&
    lines.every((l) => /^[•\-*]/.test(l));

  if (looksLikeList) {
    const items = lines
      .map((l) => `<li>${escapeHtml(l.replace(/^[•\-*]\s*/, ""))}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  }

  return `<p>${escapeHtml(content).replace(/\n/g, "<br>")}</p>`;
}

// ---- UI RENDERING ----
function renderNotes(notes) {
  notesGrid.innerHTML = "";

  noteCount.innerText = `${notes.length} note${notes.length === 1 ? "" : "s"}`;

  if (notes.length === 0) {
    emptyState.hidden = false;
    notesGrid.hidden = true;
    return;
  }

  emptyState.hidden = true;
  notesGrid.hidden = false;

  notes.forEach((note, index) => {
    const color = NOTE_COLORS[index % NOTE_COLORS.length];
    const card = document.createElement("div");
    card.className = `note-card ${color}`;
    card.dataset.id = note.id;

    card.innerHTML = `
      <div class="note-card-header">
        <h3>${escapeHtml(note.title)}</h3>
        <button class="note-menu-btn" aria-label="More options">⋮</button>
      </div>
      <div class="note-card-body">
        ${renderNoteBody(note.content)}
      </div>
      <div class="note-card-footer">
        <span class="note-timestamp">${formatTimestamp(note.created_at)}</span>
        <div class="note-actions">
          <button class="edit-note" aria-label="Edit note">✏️</button>
          <button class="delete-note" aria-label="Delete note">🗑️</button>
        </div>
      </div>
    `;

    notesGrid.appendChild(card);
  });
}

// ---- EVENT DELEGATION FOR EDIT / DELETE ----
notesGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".note-card");
  if (!card) return;
  const id = card.dataset.id;
  const note = allNotes.find((n) => String(n.id) === String(id));
  if (!note) return;

  if (e.target.closest(".edit-note")) {
    editNote(note);
  } else if (e.target.closest(".delete-note")) {
    deleteNote(note.id);
  }
});

// ---- TRIGGER EDIT MODE ----
function editNote(note) {
  editNoteId = note.id; // Store active note context

  // Populate existing modal inputs with the note details
  document.getElementById("noteTitle").value = note.title;
  document.getElementById("noteContent").value = note.content;

  // Change button label and display modal
  document.getElementById("modalTitle").innerText = "Edit Note";
  saveNoteBtn.innerText = "Update Note";
  noteModal.classList.add("open");
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

// ---- DELETE ALL NOTES ----
deleteAllNotesBtn.addEventListener("click", async () => {
  const user = await getCurrentUser();
  if (!user) return;
  if (allNotes.length === 0) return;
  if (!confirm("Delete all notes? This cannot be undone.")) return;

  const { error } = await client
    .from("notes")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
  } else {
    loadNotes();
  }
});

// ---- SEARCH ----
searchNotes.addEventListener("input", () => {
  const query = searchNotes.value.trim().toLowerCase();
  if (!query) {
    renderNotes(allNotes);
    return;
  }
  const filtered = allNotes.filter(
    (n) =>
      n.title.toLowerCase().includes(query) ||
      n.content.toLowerCase().includes(query)
  );
  renderNotes(filtered);
});

// ---- LOGOUT ----
logoutBtn.addEventListener("click", async () => {
  await client.auth.signOut();
  window.location.href = "../index.html";
});