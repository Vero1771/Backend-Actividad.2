var express = require('express');
var router = express.Router();
const FuncionController = require('../controllers/funcionController');

// --- API (JSON) ---
router.get('/api', (req, res) => {
	const { start, end } = req.query;
	FuncionController.index({ start, end })
		.then(funciones => res.json({ start, end, funciones }))
		.catch(err => res.status(500).json({ error: err.message }));
});

router.post('/api', (req, res) => {
	FuncionController.create(req.body)
		.then(created => res.status(201).json(created))
		.catch(err => res.status(500).json({ error: err.message }));
});

router.get('/api/:id', (req, res) => {
	FuncionController.findById(req.params.id)
		.then(func => {
			if (!func) return res.status(404).json({ error: 'Not found' });
			const movieP = func.movieId ? require('../models/movie').findById(func.movieId) : Promise.resolve(null);
			const salaP = func.salaId ? require('../models/sala').findById(func.salaId) : Promise.resolve(null);
			Promise.all([movieP, salaP])
				.then(([movie, sala]) => res.json({ ...func, movie, sala }))
				.catch(err => res.status(500).json({ error: err.message }));
		})
		.catch(err => res.status(500).json({ error: err.message }));
});

router.put('/api/:id', (req, res) => {
	FuncionController.update(req.params.id, req.body)
		.then(updated => {
			if (!updated) return res.status(404).json({ error: 'Not found' });
			res.json(updated);
		})
		.catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/api/:id', (req, res) => {
	FuncionController.delete(req.params.id)
		.then(ok => res.json({ deleted: ok }))
		.catch(err => res.status(500).json({ error: err.message }));
});

router.post('/api/:id/unlink', (req, res) => {
	const which = req.query.which;
	FuncionController.unlink(req.params.id, which)
		.then(func => {
			if (!func) return res.status(404).json({ error: 'Not found' });
			res.json(func);
		})
		.catch(err => res.status(500).json({ error: err.message }));
});

// --- Views ---
router.get('/', (req, res) => {
	const { start, end } = req.query;
	FuncionController.index({ start, end })
		.then(funciones => res.render('funciones/index', { funciones, start, end }))
		.catch(err => res.status(500).send(err.message));
});

router.get('/new', (req, res) => {
	FuncionController.newFormData()
		.then(data => res.render('funciones/new', data))
		.catch(err => res.status(500).send(err.message));
});

router.post('/create', (req, res) => {
	FuncionController.create(req.body)
		.then(() => res.redirect('/funciones'))
		.catch(err => res.status(500).send(err.message));
});

router.get('/:id/edit', (req, res) => {
	FuncionController.editFormData(req.params.id)
		.then(data => {
			if (!data) return res.status(404).send('Not found');
			res.render('funciones/edit', { func: data.func, movies: data.movies, salas: data.salas });
		})
		.catch(err => res.status(500).send(err.message));
});

router.post('/:id/update', (req, res) => {
	FuncionController.update(req.params.id, req.body)
		.then(() => res.redirect('/funciones'))
		.catch(err => res.status(500).send(err.message));
});

router.post('/:id/delete', (req, res) => {
	FuncionController.delete(req.params.id)
		.then(() => res.redirect('/funciones'))
		.catch(err => res.status(500).send(err.message));
});

router.post('/:id/unlink', (req, res) => {
	const which = req.query.which;
	FuncionController.unlink(req.params.id, which)
		.then(() => res.redirect('/funciones'))
		.catch(err => res.status(500).send(err.message));
});

module.exports = router;
