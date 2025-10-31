var express = require('express');
var router = express.Router();
const FuncionController = require('../controllers/funcionController');

// --- API (JSON) ---
router.get('/api', (req, res) => {
	const { start, end } = req.query;
	const funciones = FuncionController.index({ start, end });
	res.json({ start, end, funciones });
});

router.post('/api', (req, res) => {
	const created = FuncionController.create(req.body);
	res.status(201).json(created);
});

router.get('/api/:id', (req, res) => {
	const func = FuncionController.findById(req.params.id);
	if (!func) return res.status(404).json({ error: 'Not found' });
	// enrich
	const enriched = {
		...func,
		movie: func.movieId ? require('../models/movie').findById(func.movieId) : null,
		sala: func.salaId ? require('../models/sala').findById(func.salaId) : null
	};
	res.json(enriched);
});

router.put('/api/:id', (req, res) => {
	const updated = FuncionController.update(req.params.id, req.body);
	if (!updated) return res.status(404).json({ error: 'Not found' });
	res.json(updated);
});

router.delete('/api/:id', (req, res) => {
	const ok = FuncionController.delete(req.params.id);
	res.json({ deleted: ok });
});

router.post('/api/:id/unlink', (req, res) => {
	const which = req.query.which;
	const func = FuncionController.unlink(req.params.id, which);
	if (!func) return res.status(404).json({ error: 'Not found' });
	res.json(func);
});

// --- Views ---
router.get('/', (req, res) => {
	const { start, end } = req.query;
	const funciones = FuncionController.index({ start, end });
	res.render('funciones/index', { funciones, start, end });
});

router.get('/new', (req, res) => {
	const data = FuncionController.newFormData();
	res.render('funciones/new', data);
});

router.post('/create', (req, res) => {
	FuncionController.create(req.body);
	res.redirect('/funciones');
});

router.get('/:id/edit', (req, res) => {
	const data = FuncionController.editFormData(req.params.id);
	if (!data) return res.status(404).send('Not found');
	res.render('funciones/edit', { func: data.func, movies: data.movies, salas: data.salas });
});

router.post('/:id/update', (req, res) => {
	FuncionController.update(req.params.id, req.body);
	res.redirect('/funciones');
});

router.post('/:id/delete', (req, res) => {
	FuncionController.delete(req.params.id);
	res.redirect('/funciones');
});

router.post('/:id/unlink', (req, res) => {
	const which = req.query.which;
	FuncionController.unlink(req.params.id, which);
	res.redirect('/funciones');
});

module.exports = router;
