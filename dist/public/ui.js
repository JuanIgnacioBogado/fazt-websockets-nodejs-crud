"use strict";

var notesList = document.querySelector('#notes');
var savedID = '';

var appendNote = function appendNote(note) {
  var div = document.createElement('div');
  div.classList = "card card-body rounded-0 mb-2 animate__animated animate__fadeInUp";
  div.innerHTML = "\n        <div class=\"d-flex justify-content-between\">\n            <h3 class=\"card-title\">".concat(note.title, "</h3>\n            <div>\n                <button class=\"btn btn-danger delete\" data-id=\"").concat(note.id, "\">Delete</button>\n                <button class=\"btn btn-secondary update\" data-id=\"").concat(note.id, "\">Update</button>\n            </div>\n        </div>\n        <p>").concat(note.description, "</p>\n    ");
  var btnDelete = div.querySelector('.delete');
  var btnUpdate = div.querySelector('.update');
  btnUpdate.addEventListener('click', function () {
    getNote(btnUpdate.dataset.id);
  });
  btnDelete.addEventListener('click', function () {
    deleteNote(btnDelete.dataset.id);
  });
  notesList.appendChild(div);
};

var loadNotes = function loadNotes(notes) {
  notesList.innerHTML = '';
  notes.forEach(function (note) {
    return appendNote(note);
  });
};