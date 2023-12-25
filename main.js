

let notesListedRootElement = document.querySelector('#notes')

let notes = [];

function renderElementsToscreen(){

  if(localStorage.getItem('notes')){
    notes = JSON.parse(localStorage.getItem('notes'))
    notes.forEach(note=>{
      renderNoteToListed(note, note.uniqueId);
    })
  }

}

renderElementsToscreen();

document.querySelector('#deleteall').addEventListener('click', ()=>{
  document.querySelectorAll('.note').forEach(note =>{
    note.remove();
  })
  localStorage.clear();
})

document.querySelector('#createButton').addEventListener('click', ()=>{

  let uniqueId = 'note' + Math.floor(Math.random() * 1000)

  let note = {
    title : document.querySelector('#title').value,
    content : document.querySelector('#content').value,
  }

  addNoteToLocalStorage(note, uniqueId)

  renderNoteToListed(note, uniqueId);

})

function renderNoteToListed(note, uniqueId){
  

  let noteDiv = document.createElement('div')
  noteDiv.classList.add('note' , uniqueId);
  let noteTitle = document.createElement('h4')
  let noteContent = document.createElement('p')
  let noteButton = document.createElement('button')
  noteButton.id = 'delete';

  noteButton.addEventListener('click', ()=>{
    renderDeleteNoteListed(uniqueId);
  })

  noteTitle.innerHTML = note.title;
  noteContent.innerHTML = note.content;
  noteButton.innerHTML = 'Delete';

  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(noteButton);


  notesListedRootElement.appendChild(noteDiv);

  document.querySelector('#title').value = "",
  document.querySelector('#content').value = ""

}

function addNoteToLocalStorage(note, uniqueId){
  note = {...note , uniqueId}

  notes.push(note)

  localStorage.setItem('notes', JSON.stringify(notes))

}


function renderDeleteNoteListed(id){
  console.log(id)

  document.querySelector('.' + id).remove();

  notes = JSON.parse(localStorage.getItem('notes'))

  let index = notes.findIndex(note=> note.uniqueId == id)

  notes.splice(index, 1)

  localStorage.setItem("notes", JSON.stringify(notes))
}

