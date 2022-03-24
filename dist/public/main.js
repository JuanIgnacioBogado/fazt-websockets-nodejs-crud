"use strict";

var noteForm = document.querySelector('#noteForm');
var title = document.querySelector('#title');
var description = document.querySelector('#description');
noteForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (savedID) {
    updateNote(savedID, title.value, description.value);
  } else {
    saveNote(title.value, description.value);
  }

  title.value = '';
  description.value = '';
  savedID = '';
  title.focus();
});