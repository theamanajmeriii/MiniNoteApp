var express = require('express');
var router = express.Router();
const notes = require('../data/notes');
const { randomUUID } = require('crypto');

/* GET all notes */
router.get('/', function (req, res) {
  res.render('index', { notes, title: 'All Notes' }); 
});

/* NEW note form */
router.get('/new', function (req, res) {
  res.render('new');
});

/* CREATE note */
router.post('/', function (req, res) {
  const { title, content } = req.body;

  notes.push({
    id: randomUUID(),
    title,
    content
  });

  res.redirect('/notes');
});

/* SHOW one note */
router.get('/:id', function (req, res) {
  const note = notes.find(n => n.id === req.params.id);

  if (!note) {
    return res.redirect('/notes');
  }

  res.render('show', { note });
});

/* DELETE note */
router.post('/:id/delete', function (req, res) {
  const index = notes.findIndex(n => n.id === req.params.id);
  notes.splice(index, 1);
  res.redirect('/notes');
});

module.exports = router;