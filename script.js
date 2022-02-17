// console.log('HELLO');
showNotes();

const addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', () => {
  const note_title = document.querySelector('.note_title');
  const note_text = document.querySelector('.note_text');
  const notes = localStorage.getItem('notes');
//   console.log(note_text, note_title);
  if (note_text !== '' && note_title !== '') {
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(note_title.value);
    notesObj.push(note_text.value);
    note_text.value = '';
    note_title.value = '';
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // console.log(notesObj);
    showNotes();
  } else {
    if (note_title === '') alert('enter a suitable title for the note');
    else if (note_text === '') alert('enter a suitable text for the note');
    note_text.value = '';
    note_title.value = '';
  }
});

function showNotes() {
  const notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let sampleHTML = '';
  for (let i = 0; i < notesObj.length; i += 2) {
    let index = i / 2 + 1;
    sampleHTML += `
    <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${notesObj[i]}</h5>
          <p class="card-text">${notesObj[i + 1]}</p>
          <button id="${index}" onclick="deleteNote(this.id)" href="#" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
  }
  let notesElement = document.getElementById('notes');

  if (notesObj.length != 0) notesElement.innerHTML = sampleHTML;
  else
    notesElement.innerHTML =
      'Nothing to show.! Use the "ADD NOTES" section above to add new notes.';
}

function deleteNote(index) {
//   console.log('DELETE', index);
  const notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(2 * (index - 1), 2);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  showNotes();
}

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', function () {
  let inputText = searchTxt.value.toLowerCase();
  let noteCards = document.getElementsByClassName('noteCard');
//   console.log(noteCards);
  Array.from(noteCards).forEach(function (element) {
    let heading = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
    let content = element.getElementsByTagName('p')[0].innerText.toLowerCase();
    // console.log(heading, content);
    if (heading.includes(inputText) || content.includes(inputText)) {
      element.style.display = 'block';
    } else element.style.display = 'none';
  });
});
