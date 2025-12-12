document.addEventListener('DOMContentLoaded', () => {
  // ==== Modal & Note Creation ====
  const cancelBtn = document.getElementById('close-modal-btn');
  const addNoteBtn = document.getElementById('add-note-btn');
  const noteModal = document.getElementById('addNote-Modal');
  const mainContent = document.querySelector('.main-content');
  const applyBtn = document.getElementById('applyBtn');
  const input = document.getElementById('input-text');

  addNoteBtn.addEventListener('click', () => {
    noteModal.classList.remove('hidden');
    setTimeout(() => noteModal.classList.add('active'), 10);
    mainContent.classList.add('blur-effect');
  });
  cancelBtn.addEventListener('click', () => {
    noteModal.classList.remove('active');
    setTimeout(() => {
      noteModal.classList.add('hidden');
      mainContent.classList.remove('blur-effect');
    }, 200);
  });
  applyBtn.addEventListener('click', () => {
    const content = document.getElementById('notesContent');
    let value = input.value.trim();
    if (!value) return;
    value = value.charAt(0).toUpperCase() + value.slice(1);

    const note = document.createElement('div');
    note.classList.add('note-content');
    note.innerHTML = `
      <div class="note">
        <input type="checkbox" />
        <span class="note-text">${value}</span>
      </div>
      <div class="note-btn">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>`;

    content.prepend(note);
    input.value = '';
    noteModal.classList.remove('active');
    setTimeout(() => {
      noteModal.classList.add('hidden');
      mainContent.classList.remove('blur-effect');
    }, 200);
  });

  // ==== Checkbox Toggle ====
  document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      const txt = e.target.closest('.note').querySelector('.note-text');
      txt.classList.toggle('completed', e.target.checked);
    }
  });

  // ==== Theme Toggle ====
  const themeBtn = document.querySelector('.theme');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    document.getElementById('moon-icon').classList.toggle('hidden');
    document.getElementById('bulb-icon').classList.toggle('hidden');
  });

  // ==== Delete & Edit Delegation ====
  const noteContainer = document.getElementById('notesContent');
  noteContainer.addEventListener('click', (e) => {
    // Delete
    const delBtn = e.target.closest('.delete-btn');
    if (delBtn) {
      delBtn.closest('.note-content').remove();
      return;
    }

    // Edit
    const editBtn = e.target.closest('.edit-btn');
    if (!editBtn) return;

    const span = editBtn.closest('.note-content').querySelector('.note-text');
    span.contentEditable = 'true';
    span.classList.add('editing');
    span.focus();

    function finishEdit() {
      span.contentEditable = 'false';
      span.classList.remove('editing');
      const txt = span.textContent.trim();
      span.textContent = txt ? txt.charAt(0).toUpperCase() + txt.slice(1) : '';
      span.removeEventListener('blur', finishEdit);
      span.removeEventListener('keydown', onKeyDown);
    }
    function onKeyDown(ev) {
      if (ev.key === 'Enter' || ev.key === 'Escape') {
        ev.preventDefault();
        span.blur();
      }
    }
    span.addEventListener('blur', finishEdit);
    span.addEventListener('keydown', onKeyDown);
  });
});
