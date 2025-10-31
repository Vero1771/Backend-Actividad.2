var express = require('express');
var router = express.Router();
const MovieController = require('../controllers/movieController');

// --- API endpoints (JSON) ---
// lista
router.get('/api', (req, res) => {
	MovieController.index()
		.then(movies => res.json(movies))
		.catch(err => res.status(500).json({ error: err.message }));
});

// último 5
router.get('/api/last5', (req, res) => {
	const sortBy = req.query.sort || 'year';
	MovieController.last5(sortBy)
		.then(movies => res.json({ sortBy, movies }))
		.catch(err => res.status(500).json({ error: err.message }));
});

// get by id
router.get('/api/:id', (req, res) => {
	MovieController.findById(req.params.id)
		.then(movie => {
			if (!movie) return res.status(404).json({ error: 'Not found' });
			res.json(movie);
		})
		.catch(err => res.status(500).json({ error: err.message }));
});

// create
router.post('/api', (req, res) => {
	MovieController.create(req.body)
		.then(created => res.status(201).json(created))
		.catch(err => res.status(500).json({ error: err.message }));
});

// update
router.put('/api/:id', (req, res) => {
	MovieController.update(req.params.id, req.body)
		.then(updated => {
			if (!updated) return res.status(404).json({ error: 'Not found' });
			res.json(updated);
		})
		.catch(err => res.status(500).json({ error: err.message }));
});

// delete
router.delete('/api/:id', (req, res) => {
	MovieController.delete(req.params.id)
		.then(ok => res.json({ deleted: ok }))
		.catch(err => res.status(500).json({ error: err.message }));
});

// --- View routes (render EJS) ---
router.get('/', (req, res) => {
	MovieController.index()
		.then(movies => res.render('movies/index', { movies }))
		.catch(err => res.status(500).send(err.message));
});

router.get('/new', (req, res) => {
	res.render('movies/new');
});

router.post('/create', (req, res) => {
	MovieController.create(req.body)
		.then(() => res.redirect('/movies'))
		.catch(err => res.status(500).send(err.message));
});

router.get('/last5', (req, res) => {
	const sortBy = req.query.sort || 'year';
	MovieController.last5(sortBy)
		.then(movies => res.render('movies/last5', { movies, sortBy }))
		.catch(err => res.status(500).send(err.message));
});

router.get('/:id/edit', (req, res) => {
	MovieController.findById(req.params.id)
		.then(movie => {
			if (!movie) return res.status(404).send('Not found');
			res.render('movies/edit', { movie });
		})
		.catch(err => res.status(500).send(err.message));
});

router.post('/:id/update', (req, res) => {
	MovieController.update(req.params.id, req.body)
		.then(() => res.redirect('/movies'))
		.catch(err => res.status(500).send(err.message));
});

router.post('/:id/delete', (req, res) => {
	MovieController.delete(req.params.id)
		.then(() => res.redirect('/movies'))
		.catch(err => res.status(500).send(err.message));
});

module.exports = router;
