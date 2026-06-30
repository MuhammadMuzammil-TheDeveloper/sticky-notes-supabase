let noteModal = document.getElementById('noteModal')
let addNoteFab = document.getElementById('addNoteFab')
let closeModal = document.getElementById('closeModal')


addNoteFab.addEventListener('click', ()=>{
    console.log('working...')
    noteModal.style.display = 'block'
})
closeModal.addEventListener('click', ()=>{
    console.log('working...')
    noteModal.style.display = 'none'
})


//Add notes 
const saveNoteBtn = document.getElementById('saveNoteBtn')
saveNoteBtn.addEventListener("click", async ()=>{
    let noteTitle
})