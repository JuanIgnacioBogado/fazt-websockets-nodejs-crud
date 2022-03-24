const notesList = document.querySelector('#notes');
let savedID = '';

const appendNote = note => {
    const div = document.createElement('div');
    div.classList = "card card-body rounded-0 mb-2 animate__animated animate__fadeInUp"
    div.innerHTML = `
        <div class="d-flex justify-content-between">
            <h3 class="card-title">${note.title}</h3>
            <div>
                <button class="btn btn-danger delete" data-id="${note.id}">Delete</button>
                <button class="btn btn-secondary update" data-id="${note.id}">Update</button>
            </div>
        </div>
        <p>${note.description}</p>
    `;

    const btnDelete = div.querySelector('.delete');
    const btnUpdate = div.querySelector('.update');

    btnUpdate.addEventListener('click', () => {
        getNote(btnUpdate.dataset.id);

    });

    btnDelete.addEventListener('click', () => {
        deleteNote(btnDelete.dataset.id);
    });
    notesList.appendChild(div);
};

const loadNotes = notes => {
    notesList.innerHTML = '';
    notes.forEach(note => appendNote(note));
};