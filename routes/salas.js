var express = require('express');
var router = express.Router();
const SalaController = require('../controllers/salaController');

// --- API (JSON) ---
router.get('/api', (req, res) => {
	const salas = SalaController.index();
	res.json(salas);
});

router.post('/api', (req, res) => {
	const created = SalaController.create(req.body);
	res.status(201).json(created);
});

router.get('/api/:id', (req, res) => {
	const sala = SalaController.findById(req.params.id);
	if (!sala) return res.status(404).json({ error: 'Not found' });
	res.json(sala);
});

router.put('/api/:id', (req, res) => {
	const updated = SalaController.update(req.params.id, req.body);
	if (!updated) return res.status(404).json({ error: 'Not found' });
	res.json(updated);
});

router.delete('/api/:id', (req, res) => {
	const ok = SalaController.delete(req.params.id);
	res.json({ deleted: ok });
});

// --- Views ---
router.get('/', (req, res) => {
	const salas = SalaController.index();
	res.render('salas/index', { salas });
});

router.get('/new', (req, res) => {
	res.render('salas/new');
});

router.post('/create', (req, res) => {
	SalaController.create(req.body);
	res.redirect('/salas');
});

router.get('/:id', (req, res) => {
	const sala = SalaController.findById(req.params.id);
	if (!sala) return res.status(404).send('Not found');
	res.render('salas/show', { sala });
});

router.get('/:id/edit', (req, res) => {
	const sala = SalaController.editFormData(req.params.id);
	if (!sala) return res.status(404).send('Not found');
	res.render('salas/edit', { sala });
});

router.post('/:id/update', (req, res) => {
	SalaController.update(req.params.id, req.body);
	res.redirect('/salas');
});

router.post('/:id/delete', (req, res) => {
	SalaController.delete(req.params.id);
	res.redirect('/salas');
});

module.exports = router;
