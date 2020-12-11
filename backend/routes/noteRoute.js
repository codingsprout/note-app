const router = require('express').Router();
const noteControl = require('../controllers/noteControl');
const auth = require('../middleware/auth');

router
  .route('/')
  .get(auth, noteControl.getNotes)
  .post(auth, noteControl.createNotes);

router
  .route('/:id')
  .get(auth, noteControl.getNote)
  .put(noteControl.updateNotes)
  .delete(auth, noteControl.deleteNotes);

module.exports = router;
